/**
 * @author megastruktur
 */
class SimpleNameGeneratorMacros {

  /**
   * Generate Name conditional wrapper.
   * @param {string} gender
   * @param {string} name_type
   */
  static generateName(gender = "masc", name_type = "english") {

    let names = [];
    let names_html = "";

    for (let i = 1; i <= 5; i++) {
      let idx_name = Math.floor(Math.random() * SNG_NAMES[name_type][gender].length);
      let idx_surname = Math.floor(Math.random() * SNG_NAMES[name_type]["surname"].length);
      let name = `${SNG_NAMES[name_type][gender][idx_name]} ${SNG_NAMES[name_type]["surname"][idx_surname]}`;
      names.push(name);
    }

    names.forEach(n => {
      names_html += `${n}<br>`;
      // @todo Make every name click-to-copy
      // names_html += `<a class="click-to-copy">${n}</a><br>`;
    });

    let chatData = {
      "user": game.user._id,
      "whisper": [game.user._id],
      "content": names_html,
      "sound": CONFIG.sounds.notification
    }
    CONFIG.ChatMessage.entityClass.create(chatData);
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