import {
  Controller,
  Post,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  HttpCode,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { SignUpDto } from "./Dto/signup.dto";
import { LoginDto } from "./Dto/login.dto";
import { AuthService } from "./auth.service";
import { ResetPasswordDto } from "./Dto/resetpass.dto";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post("signupclient")
  async signUpClient(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUpClient(signUpDto);
  }

  @Post("signupadmin")
  async signUpAdmin(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUpAdmin(signUpDto);
  }

  @Post("signupvendeur")
  async signUpVendeur(
    @Body() signUpDto: SignUpDto
  ): Promise<{ token: string }> {
    return this.authService.signUpVendeur(signUpDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("logout/:id")
  async logout(
    @Param("id") userId: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      await this.authService.logout(userId);
      res.status(200).json({ message: "Utilisateur déconnecté avec succès" });
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ error: "Utilisateur non trouvé" });
      } else {
        res.status(500).json({ error: "Erreur lors de la déconnexion" });
      }
    }
  }

  @Post("send-password-reset-email")
  @HttpCode(200)
  async sendPasswordResetEmail(@Body("email") email: string): Promise<any> {
    const success = await this.authService.sendPasswordResetEmail(email);

    if (success) {
      return { message: "Password reset email sent successfully" };
    } else {
      return { message: "Email not found" };
    }
  }

  @Post("reset-password")
  @HttpCode(200)
  async resetPassword(
    @Body("token") token: string,
    @Body("newPassword") newPassword: string
  ): Promise<any> {
    const success = await this.authService.resetPassword(token, newPassword);

    if (success) {
      return { message: "Password reset successful" };
    } else {
      return { message: "Invalid or expired token" };
    }
  }
}
