(function($) {
  $.fn.setAvg = function(options) {
    var defaults = {
      setId: null,
      baseId: "shijitianshu",
      pjIds: "",
      isDynamic: "false",
      weishu: 2
    };
    var opts = $.extend({},
    defaults, options);
    return $(this).bind("paste cut keydown keyup focus blur",
    function() {
      //如果该数据为动态添加行
      if (opts.isDynamic == "true") {}
      //如果当前DOM元素的ID = 基础的baseid我们则认为控制反转
      else if ($(this).attr("id") == opts.baseId) {
        var setIds = opts.setId.split(",");
        for (var i = 0; i < setIds.length; i++) {
          var mm = $("#" + setIds[i]).val();
          //判断实际天数中是否有值
          var baseVal = $("#" + opts.baseId).val();
          if (baseVal == 0 || baseVal == "" || baseVal == undefined) {
            $("#" + opts.pjIds.split(",")[i]).val(0);
          } else {
            $("#" + opts.pjIds.split(",")[i]).val((mm / $(this).val()).toFixed(opts.weishu));
          }
        }
      } else {
        var m = $(this).val();
        var b = $("#" + opts.baseId).val();

        if (b == 0 || b == "" || b == undefined) {
          $("#" + opts.setId).val(0);
        } else {
          $("#" + opts.setId).val((m / b).toFixed(opts.weishu));
        }
      }
    });
  }
})(jQuery);