# Agape Material


## Forms

### Dates

You must provide a date adapter to use the `date` form field. The forms module
providers the `VERBOSE_DATE_PROVIDERS` by default. You may over-ride these
settings at the module or component level.

```
import { VERBOSE_DATE_PROVIDERS } from '@agape/material';

@Component({
  ...
  providers: [ ...VERBOSE_DATE_PROVIDERS  ],

})
```

## Styles

Material Styles for Agape

### Synopsis

```
# in your styles.scss

@import "~@agape/material/styles"
@import "~@agape/material/themes/aion-blue"
```

### Description

A collection of SCSS styles and themes for Angular Material.

## Cookbook

### Full Page Application with Navigation

This pattern will create a sidenav and router outlet which fill the
entire viewport horizontally and vertically.

```
<div class="ag-app-container">
  <mat-sidenav-container>
    <mat-sidenav mode="side" opened>Sidenav content</mat-sidenav>
    <mat-sidenav-content>
      <div class="router-outlet-container primary-router">
        <router-outlet>

        </router-outlet>
      </div>
    </mat-sidenav-content>
  </mat-sidenav-container>
</div>
```

## Author

Maverik Minett  maverik.minett@gmail.com

## Copyright

© 2021-2022 Maverik Minett

## License

MIT
