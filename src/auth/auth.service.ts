import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { Client, ClientSchema } from "src/client/models/clients.models";
import { Admin, AdminSchema } from "src/admin/models/admin.models";
import { Vendeur, VendeurSchema } from "src/vendeur/models/vendeur.models";
import { User, UserSchema } from "src/users/models/users.models";
import { SignUpDto } from "./Dto/signup.dto";
import { LoginDto } from "./Dto/login.dto";
import * as nodemailer from "nodemailer";
import { MailerService } from "@nestjs-modules/mailer";
import { v4 as uuidv4 } from "uuid";
import { ResetPasswordDto } from "./Dto/resetpass.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<Client>,
    @InjectModel(Admin.name)
    private adminModel: Model<Admin>,
    @InjectModel(Vendeur.name)
    private vendeurModel: Model<Vendeur>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async logout(userId: string): Promise<void> {
    // Utilisez l'ID pour déconnecter l'utilisateur
    const user: User = await this.userModel.findByIdAndUpdate(
      userId,
      { $unset: { accessToken: 1 } },
      { new: true }
    );

    if (!user) {
      throw new NotFoundException("Utilisateur non trouvé");
    }
  }
  async signUpClient(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, role } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;

    user = await this.clientModel.create({
      name,
      email,
      password: hashedPassword,
      //role :"client",
    });

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token };
  }
  async signUpAdmin(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, role } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;

    user = await this.adminModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token };
  }
  async signUpVendeur(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, role } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;

    user = await this.vendeurModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; role: string }> {
    const { email, password } = loginDto;

    const client = await this.clientModel.findOne({ email });
    const admin = await this.adminModel.findOne({ email });
    const vendeur = await this.vendeurModel.findOne({ email });

    let user;
    let role;

    if (client) {
      user = client;
      role = "client";
    } else if (admin) {
      user = admin;
      role = "admin";
    } else if (vendeur) {
      user = vendeur;
      role = "vendeur";
    } else {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token, role: user.role };
  }

  async sendPasswordResetEmail(email: string): Promise<boolean> {
    // Check if the email exists in your database or any other data store
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return false;
    }

    // Generate a password reset token
    const token = this.jwtService.sign({ email }, { expiresIn: "48h" });

    // Save the token somewhere (e.g., in a Redis cache or a database) if you don't want to store it in the user object.
    user.resetPasswordToken = token;

    await user.save();

    const appBaseUrl = "http://localhost:4200";
    const resetPasswordLink = `${appBaseUrl}/reset-password?token=${token}`;

    // Send the password reset email
    await this.mailerService.sendMail({
      to: email,
      subject: "Password Reset",
      text: `To reset your password, click the following link: ${resetPasswordLink}`,
    });

    return true;
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    // Verify the token
    const decodedToken: any = this.jwtService.verify(token);

    if (!decodedToken || !decodedToken.email) {
      return false;
    }

    // Find the user by the email in the token
    const user = await this.userModel.findOne({ email: decodedToken.email });

    if (!user || user.resetPasswordToken !== token) {
      return false;
    }

    // Update the password with the new one
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    await user.save();

    return true;
  }
}
