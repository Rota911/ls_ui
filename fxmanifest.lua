fx_version 'cerulean'
game 'gta5'
use_experimental_fxv2_oal 'yes'
lua54 'yes'


client_scripts {
    'client/**/*.lua'
}

server_scripts {
    'server/**/*.lua'
}


ui_page 'web/build/index.html'

files {
    'web/build/index.html',
    'web/build/assets/*',
    'web/build/assets/*.js',
    'web/build/assets/*.css'
}
