# Agape/Core


## Synopsis

```
import { environment } from '../environments/environment'
import { AgapeModule } from '@agape/core'

@NgModule({
  
  imports: [
    AgapeModule.forRoot( { environment: environment } )
  ],

  ...
})
export class AppModule { }
```

## License

Copyright (C) 2021 Maverik Minett

The (MIT) license.