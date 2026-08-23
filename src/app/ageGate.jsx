
import {ageVerified} from  "./actions"

export default function AgeGate() {
    var d = new Date();
    d.setTime(d.getTime() + (15) * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    var notice = "This website contains age-restricted materials including nudity and explicit depictions of sexual activity. By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction you are accessing the website from and you consent to viewing sexually explicit content."
    
    function verifyAge() {
        console.log("tripped")
        var d = new Date();
        d.setTime(d.getTime() + (15) * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = "accessAge=2;expires" + expires;

    }

    return (
        <div className="ageContainer">
            <form className="ageBlocker">
                <h3>This is an adult website</h3>
                <h4>{notice}</h4>
                <button formAction={ageVerified}>I am 18 or older - Enter</button>
                <button> I am under 18 - Exit</button>
            </form>
        </div>
    )
}


