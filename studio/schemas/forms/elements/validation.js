export default {
  type: 'object',
  name: 'validation',
  title: 'Validation',
  fields: [
    {
      title: 'Required',
      name: 'required',
      type: 'boolean'
    },
    {
      title: 'Custom Feedback',
      description: 'This overrides the default feedback for this input',
      name: 'customFeedback',
      type: 'string'
    },
    {
      title: 'Email Required',
      name: 'emailRequired',
      type: 'boolean'
    },
    {
      title: 'Currency Required',
      name: 'currencyRequired',
      type: 'boolean'
    },
    {
      title: 'Telephone Required',
      name: 'telephoneRequired',
      type: 'boolean'
    },
    {
      title: 'Date Required',
      name: 'dateRequired',
      type: 'boolean'
    },
    {
      title: 'Alphanumeric Required',
      name: 'alphanumericRequired',
      type: 'boolean'
    },
    {
      title: 'Minimum String Length',
      name: 'minStringLength',
      type: 'number'
    },
    {
      title: 'Maximum String Length',
      name: 'maxStringLength',
      type: 'number'
    },
    {
      title: 'Exclude Values Containing Characters',
      name: 'excludeValue',
      type: 'string'
    },
    {
      title: 'RegEx Pattern',
      name: 'regexPattern',
      type: 'string'
    },
    {
      title: 'Number Required',
      name: 'numberRequired',
      type: 'number'
    },
    {
      title: 'Number Decimal Limit',
      name: 'numberDecimalLimitRequired',
      type: 'number'
    },
    {
      title: 'Minimum Number Required',
      name: 'minNumberRequired',
      type: 'number'
    },
    {
      title: 'Maximum Number Required',
      name: 'maxNumberRequired',
      type: 'number'
    }
  ]
}
