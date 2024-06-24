import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  constructor(
    private userService: UserService,
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let currentSlide: number = 0;
      const slides = this.el.nativeElement.querySelectorAll('.slide');
      const totalSlides: number = slides.length;

      if (totalSlides > 0) {
        this.renderer.addClass(slides[currentSlide], 'active');

        setInterval(() => {
          this.renderer.removeClass(slides[currentSlide], 'active');
          currentSlide = (currentSlide + 1) % totalSlides;
          this.renderer.addClass(slides[currentSlide], 'active');
        }, 3000);
      }

      const formLogin = this.el.nativeElement.querySelector('.login-form form') as HTMLFormElement;

      if (formLogin) {
        this.renderer.listen(formLogin, 'submit', (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          const username = (this.el.nativeElement.querySelector('#username') as HTMLInputElement).value;
          const password = (this.el.nativeElement.querySelector('#password') as HTMLInputElement).value;
          console.log('Formulario de Login Enviado...', { username, password });
          
          const loginExitoso = this.userService.iniciarSesion(username, password);
          if(loginExitoso) {
            console.log('Inicio Correcto', {username, password});
            formLogin.reset();
          } else {
            console.log('INICIO SESION ERRONEO... ');
          }

        });
      }

      throw new Error('No pasó por el IF del LOGIN');
    }

  }
}