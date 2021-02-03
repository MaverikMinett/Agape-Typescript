import {} from "jasmine"
import { Settings } from './settings'

import * as path from 'path'
import * as os from 'os'

let o;
describe('Settings', () => {
    beforeEach( () => {
        o = undefined;
    })

    it('should instantiate', () => {
        o = new Settings()
    })

    fit('should return the path to the appdata directory', () => {
        o = new Settings()
        if ( process.platform == "linux" ) {
            expect(o.appDataDir).toEqual( path.join('/home', os.userInfo().username, '.local', 'share', 'agape' ) )
        }
    })


})