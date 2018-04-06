import executableTab from './.utils/chrome/executable-tab'
import message from './.utils/chrome/message'

import setDefaults from './.utils/chrome/set-defaults'
import createMenu from './.utils/chrome/create-menu'
import initialize from './.utils/chrome/initialize-scripts'

const exec = executableTab()

function handleClick(methodName) {
    return (info, tab) => {
        if (info.selectionText) {
            exec(tab)
                .then(id =>
                    message.toTab(id, {
                        type: 'CHANGE_CASE',
                        data: methodName
                    })
                )
                .catch(error => alert(error))
        }
    }
}

createMenu(
    [
        ['upperCase', 'UPPERCASE'],
        ['lowerCase', 'lowercase'],
        ['titleCase', 'Title Case'],
        ['sentenceCase', 'Sentence case'],
        null,
        ['camelCase', 'camelCase'],
        ['pascalCase', 'PascalCase'],
        ['constantCase', 'CONSTANT_CASE'],
        null,
        ['paramCase', 'param-case'],
        ['snakeCase', 'snake_case'],
        ['dotCase', 'dot.case'],
        null,
        ['toggleCase', 'tOGGLE cASE'],
        ['noAccents', 'no accents'],
        ['noCase', 'no case']
    ],
    item => ({
        title: item[1],
        onclick: handleClick(item[0])
    }),
    {
        contexts: ['editable']
    }
)

setDefaults({
    shortcuts: {
        upperCase: 'alt+1',
        lowerCase: 'alt+2',
        titleCase: 'alt+3',
        sentenceCase: 'alt+4'
    }
})

initialize()

chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install' || reason === 'update') {
        chrome.runtime.openOptionsPage()
    }
})
