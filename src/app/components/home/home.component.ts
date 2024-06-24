import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  constructor(
    private userService: UserService,
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngAfterViewInit(): void {
    
    if (isPlatformBrowser(this.platformId)) {
      // Script del carrusel de imágenes
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
      throw new Error('Method not implemented.');
    }


  }
}