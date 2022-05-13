

## Special Properties


### `Δapply`



```
Δapply( target:HasTiedSubscriptions, trait:HasTiedSubscriptions ) {
    ...
}
```


### `decorate`




( target:HasTiedSubscriptions, trait:HasTiedSubscriptions )`

    protected Δapply( target:HasTiedSubscriptions, trait:HasTiedSubscriptions ) {
        if ( ! trait.ʘtiedSubsriptions ) return;
        if ( ! trait.ʘtiedSubsriptions.length ) return;
        target.ʘtiedSubsriptions ??= {}
        Object.keys( trait.ʘtiedSubsriptions ).map(
            key => {
                target.ʘtiedSubsriptions[key] ??= [ ]
                target.ʘtiedSubsriptions[key].push( ...trait.ʘtiedSubsriptions[key] )
            }
        )

        if ( ! trait.ʘtiedSubsriptions ) return;
    }