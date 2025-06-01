// feat: description

export enum RuleConfigSeverity {
    Disabled = 0,
    Warning = 1,
    Error = 2,
}

module.exports = {
    rules: {
        'body-leading-blank': [RuleConfigSeverity.Error, 'always'],
        'body-max-line-length': [RuleConfigSeverity.Error, 'always', 100],
        'footer-leading-blank': [RuleConfigSeverity.Error, 'always'],
        'footer-max-line-length': [RuleConfigSeverity.Error, 'always', 100],
        'header-max-length': [RuleConfigSeverity.Error, 'always', 100],
        'header-full-stop': [RuleConfigSeverity.Error, 'never', '.'],
        'subject-empty': [RuleConfigSeverity.Error, 'never'],
        'type-case': [RuleConfigSeverity.Error, 'always', 'kebab-case'],
        'type-empty': [RuleConfigSeverity.Error, 'never'],
        'type-enum': [
            RuleConfigSeverity.Error,
            'always',
            [
                'feat',
                'fix',
                'refactor',
                'chore',
                'docs',
                'lib',
                'ci',
                'style',
                'tests',
            ],
        ],
    },
}
