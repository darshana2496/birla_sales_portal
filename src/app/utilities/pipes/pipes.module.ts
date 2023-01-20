import { NgModule } from '@angular/core';
import { ConvertInrPipe } from './convert-inr';
import { CurrencyDisplayPipe } from './currency-display';
import { DefaultImagePipe } from './default-image';
import { EncryptNumberPipe } from './encrypt-number';
import { SearchBlogPipe } from './search-blog';
import { SearchFilterPipe } from './search-filter';


@NgModule({
    declarations: [
        ConvertInrPipe,
        CurrencyDisplayPipe,
        DefaultImagePipe,
        EncryptNumberPipe,
        SearchBlogPipe,
        SearchFilterPipe
    ],
    imports: [
    ],
    exports: [
        ConvertInrPipe,
        CurrencyDisplayPipe,
        DefaultImagePipe,
        EncryptNumberPipe,
        SearchBlogPipe,
        SearchFilterPipe
    ]
})
export class PipesModule { }
