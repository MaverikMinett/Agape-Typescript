 /**
 * Custom date formatting *
 */
import {InjectionToken} from '@angular/core'
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


/* Long date as Jul 1, 2018 **/
export const VERBOSE_DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

export const VERBOSE_DATE_PROVIDERS = [
  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: VERBOSE_DATE_FORMAT},
];




/**
 * Usage
 */

/**
import { VERBOSE_DATE_PROVIDERS } from '@agape/core';

@Component({
  ...
  providers: [ ...VERBOSE_DATE_PROVIDERS  ],

})
**/