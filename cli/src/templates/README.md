# {{ project.name }}

{{#if project.description}}
{{ project.description }}
{{else}}
This application was created using Agape.
{{/if}}

{{#if project.author}}

## Author

{{ project.author }}  {{#if project.email}}{{ project.email }}{{/if}}

## Copyright

© {{ project.year }} {{ project.author }}
{{/if}}

{{#if project.license}}

## License

{{ project.license }}

{{/if}}
