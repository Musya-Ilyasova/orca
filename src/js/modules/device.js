// Add formatter to input
addFormatter($('.intro-referral_content_action_text-link_input'), regexPrefix(/^\ + 44/, '+44'))// Add allowed keys to input
$('.intro-referral_content_action_text-link_input').on('keypress', inputAllowedKeys);
function addFormatter(input, formatFn) {
  var oldValue = input.val();
  var handleInput = function(event) {
    var result = formatFn(input.val(), oldValue, event);
    if(typeof result === 'string') {
      input.val(result)
    }
    oldValue = input.val();
  }
  handleInput();
  input.on("input", handleInput);
};
function regexPrefix(regex, prefix) {
  return function(newValue, oldValue) {
    if(regex.test(newValue)) {
      return newValue
    }
    else {
      if(newValue) {
        return oldValue
      }
      else {
        return prefix
      }
    }
  };
};
// Text Me a Link - allow input from 0 to 9
function inputAllowedKeys(evt) {
  var charCode =(evt.which) ? evt.which: evt.keyCode ;
  if(charCode > 31 &&(charCode < 48 || charCode > 57)) return false;
  return true;
};
