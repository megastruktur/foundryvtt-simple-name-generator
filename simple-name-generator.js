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
      names_html += `<a class="click-to-copy">${n}</a><br>`;
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

// Copy name to clipboard functionality.
document.addEventListener('click',function(e){
  // copy content of <a> tag to clipboard
  if(e.target.classList.contains('click-to-copy')){
    e.preventDefault();
    let text = e.target.innerText;
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    // Append tooltip to clicked element
    let tooltip = document.createElement("span");
    tooltip.innerText = "Copied!";
    e.target.appendChild(tooltip);
    setTimeout(function(){
      e.target.removeChild(tooltip);
      // wrap clicked element in strike tag
      e.target.innerHTML = "<strike>" + e.target.innerHTML + "</strike>";
    }, 1000);
  }
});