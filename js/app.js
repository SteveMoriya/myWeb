function validateEmail(email) {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function handleSubmit() {
  const reason = $("#reason").val();
  const email = $("#email-value").val();
  if (!validateEmail(email)) {
    Swal.fire({
      type: "error",
      title: "Oops ...",
      text: "Please submit a valid email address.",
    });
    return;
  }

  $.ajax({
    type: "POST",
    url: "/api/0.1/register-notification",
    data: JSON.stringify({ email, reason }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      Swal.fire({
        type: "success",
        showConfirmButton: false,
        timer: 1800,
      });
      $("#email-value").val("");
      $("#reason").val("");
    },
    failure: function (err) {
      alert(err);
    },
  });
}

function handleType(ev) {
  if (ev.which === 13) {
    // enter
    handleSubmit();
    return;
  }
}

$(document).ready(function () {
  // $.ajax({
  // 	type: 'POST',
  // 	url: "/api/0.1/ping"
  // })

  $("#hamburgNav").on("click", function () {
    $(".mobileFolatNav").toggleClass("navHide");
  });

  $(".close").on("click", function () {
    $(".mobileFolatNav").toggleClass("navHide");
  });

  $("#email-value").on("keypress", handleType);
  $("#email-submit").on("click", handleSubmit);
});
