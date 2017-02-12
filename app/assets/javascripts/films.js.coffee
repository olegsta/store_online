$(document).ready ->
  $(".btn-info").click ->
    $("#comment_hide").toggle("slow");



$(document).ready ->
  text_counter = (input_text, target) ->
    max = 400
    $(input_text).keydown ->
      text = $(input_text).val()
      current = text.length
      $(target).text(current + "/" + max)  
  text_counter '#description', '#description_counter'
  return

$.ajax ->
  dataType: "json"
  success: data ->    
  
    return
  error: xhr ->
    errors = $.parseJSON(xhr.responseText).errors
    
    return
 
