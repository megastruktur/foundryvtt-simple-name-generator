/**
 * @author megastruktur
 */
class SimpleNameGeneratorMacros {

  /**
   * Generate Name conditional wrapper.
   * @param {string} gender 
   */
  static generateName(gender = "male", name_type = "english") {

    let names = [];
    let names_html = "";

    switch (name_type) {
      case "english":
        names = SimpleNameGeneratorMacros.generateEnglishName(gender)
        break;
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

  /**
   * Generate simple English name.
   * @param {string} gender 
   */
  static generateEnglishName(gender) {

    let names = [];

    for (let i = 1; i <= 5; i++) {
      let idx_name = Math.floor(Math.random() * SNG_ENGLISH_NAMES[gender].length);
      let idx_surname = Math.floor(Math.random() * SNG_ENGLISH_NAMES["surname"].length);
      let name = `${SNG_ENGLISH_NAMES[gender][idx_name]} ${SNG_ENGLISH_NAMES["surname"][idx_surname]}`;
      names.push(name);
    }

    return names;
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