import { AfterViewInit, Component, PLATFORM_ID, Inject,Renderer2, ElementRef } from '@angular/core';
import { UserService } from '../login/user.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements AfterViewInit {

  constructor(
    private userSerice: UserService,
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object

  ) { }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      /* let currentSlide: number = 0;
      const slides = this.el.nativeElement.querySelectorAll('.slide');
      const totalSlides: number = slides.length;
      if (totalSlides > 0) {
        this.renderer.addClass(slides[currentSlide], 'active');

        setInterval(() => {
          this.renderer.removeClass(slides[currentSlide], 'active');
          currentSlide = (currentSlide + 1) % totalSlides;
          this.renderer.addClass(slides[currentSlide], 'active');
        }, 3000);
      } */

      const formRegister = this.el.nativeElement.querySelector('.register-form form') as HTMLFormElement;
      if (formRegister) {
        this.renderer.listen(formRegister, 'submit', (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          
          const username = (this.el.nativeElement.querySelector('#register-username') as HTMLInputElement).value;
          const nombreCompleto = (this.el.nativeElement.querySelector('#register-nameFull') as HTMLInputElement).value;
          const password = (this.el.nativeElement.querySelector('#register-password') as HTMLInputElement).value;
          const repeatpwd = (this.el.nativeElement.querySelector('#register-repeat-pwd') as HTMLInputElement).value;

          console.log('Formulario de registro enviado: ', { username, nombreCompleto, password, repeatpwd});
          
          const registroExitoso = this.userSerice.registrarUsuario(username, nombreCompleto,password, repeatpwd );
          if(registroExitoso) {
            console.log('registro OK ', { username, nombreCompleto});
            formRegister.reset();
          } else {
            console.log('Error en el registro...');
          }

        })
      }

    }
    throw new Error('No pasó por el IF del Registro');
  }
}
