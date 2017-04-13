/*
Add this file because of below:
https://github.com/SuperiorJT/angular2-qrcode/pull/4
 */
import {
  NgModule,
  Component,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import qrcode from "qrcode-generator";

@Component({
  moduleId: 'module.id',
  selector: 'qr-code',
  template: ''
})
export class QRCodeComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.generate();
    }
  }

  @Input() value: string = '';
  @Input() size: number = 128;
  @Input() type: number = 4;
  @Input() level: string = 'M';


  constructor(private elementRef: ElementRef) {
  }

  generate() {
    try {
      let qr = qrcode(this.type, this.level);
      qr.addData(this.value);
      qr.make();

      let imgTagString = qr.createImgTag(this.type, 0);
      let el: HTMLElement = this.elementRef.nativeElement;
      el.innerHTML = imgTagString;
      let imgTagObject: HTMLImageElement = <HTMLImageElement> el.firstElementChild;
      imgTagObject.width = this.size;
      imgTagObject.height = this.size;
    } catch (e) {
      console.error(`Could not generate QR Code: ${e.message}`);
    }
  }
}

@NgModule({
  exports: [QRCodeComponent],
  declarations: [QRCodeComponent],
  entryComponents: [QRCodeComponent]
})
export class QRCodeModule {
}
