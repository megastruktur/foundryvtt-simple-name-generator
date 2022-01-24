/**
 * @author megastruktur
 */
class SimpleNameGeneratorMacros {

  /**
   * Generate a simple name.
   * @param {string} name_type
   * @param {string} gender
   */
  static async generateSimpleName(name_type = "english", gender = "male") {

    const url = "https://wa1z1p0757.execute-api.eu-west-1.amazonaws.com/dev";

    const response = await fetch(`${url}/${name_type}/${gender}`);
    const names_json = await response.json(); //extract JSON from the http response
    
    SimpleNameGeneratorMacros.whisperNamesToChat(names_json);

  }

  /**
   * Whispers names to Chat.
   *
   * @param {Array} names
   */
  static whisperNamesToChat(names = []) {

    let names_html = "";
    names.forEach(n => {
      names_html += `${n}<br>`;
      // @todo Make every name click-to-copy
      // names_html += `<a class="click-to-copy">${n}</a><br>`;
    });

    let currentUserId = game.user._id;

    let chatData = {
      "user": currentUserId,
      "whisper": [currentUserId],
      "content": names_html,
      "sound": CONFIG.sounds.notification
    }
    ChatMessage.create(chatData);
  }
}

// @todo Add Click-to-copy functionality
// document.addEventListener('click',function(e){
//   if(e.target && e.target.className === 'click-to-copy') {
//     console.log(e.target.value);
//     console.log(e.target.firstChild);
//     e.target.firstChild.select();
//     document.execCommand("copy");
//   }
// });