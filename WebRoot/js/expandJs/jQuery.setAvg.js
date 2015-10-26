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
      //���������Ϊ��̬�����
      if (opts.isDynamic == "true") {}
      //�����ǰDOMԪ�ص�ID = ������baseid��������Ϊ���Ʒ�ת
      else if ($(this).attr("id") == opts.baseId) {
        var setIds = opts.setId.split(",");
        for (var i = 0; i < setIds.length; i++) {
          var mm = $("#" + setIds[i]).val();
          //�ж�ʵ���������Ƿ���ֵ
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