export class CommonFunctions {

    getCodeBoxElement(index:any) {
      return document.getElementById('codeBox' + index)?.children[0];
    }
  
    onKeyUpEventOTP(event:any, index:any, repeat:any) {
      console.log(event);
      const eventCode = event.which || event.keyCode;
      if (event.target.value.length === 1) {
        if (index !== repeat) {
          (<HTMLInputElement>this.getCodeBoxElement(index + 1)).focus();
        } else {
          (<HTMLInputElement>this.getCodeBoxElement(index)).blur();
          // Submit code
          console.log('submit code');
        }
      }
      if (eventCode === 8 && index !== 1) {
        (<HTMLInputElement>this.getCodeBoxElement(index - 1)).focus();
      }
    }
  
    onFocusEventOTP(index:any) {
      for (let item = 1; item < index; item++) {
        const currentElement = this.getCodeBoxElement(item);
        if (!(<HTMLInputElement>currentElement).value) {
          (<HTMLInputElement>currentElement).focus();
          break;
        }
      }
    }
  
  
  
    //makes header transparent to opaque
    headerSticky(e:any) {
      // console.log(e);
      var topPos = e.scrollTop;
      if (topPos >= 150) {
        document.getElementsByTagName('cm-header')[0].classList.remove('typ-transparent');
      } else {
        document.getElementsByTagName('cm-header')[0].classList.add('typ-transparent');
      }
    }
  
  
  
  }