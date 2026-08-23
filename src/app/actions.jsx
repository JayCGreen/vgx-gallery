'use server'
import {cookies} from 'next/headers'

export async function ageVerified(){
    var cookieJar = await cookies();
    var d = new Date();
    d.setTime(d.getTime() + (15)*60*1000);
    var expires = d.toUTCString();
    cookieJar.set("accessAge", 2, {expires: d})
}

