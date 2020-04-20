import { Directive, HostBinding, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen(eventData: Event) {
        this.isOpen = !this.isOpen;
    }
}