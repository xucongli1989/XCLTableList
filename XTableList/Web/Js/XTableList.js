//by:xcl @2012.8  qq:80213876
; (function ($) {
    $.extend({
        XTableList: function (options) {
            options = $.extend({}, funs.Defaults, options);
            funs.Init(options);
            $(options.tableClass).each(function () {
                var $trs = null;
                if ($(this).children("tbody").length > 0) {//浏览器会自动加tbody标签
                    $trs = options.trNoHoverClass == "" ? $(this).children().children() : $(this).children().children().not(options.trNoHoverClass);
                } else {
                    $trs = options.trNoHoverClass == "" ? $(this).children() : $(this).children().not(options.trNoHoverClass);
                }
                //滑过行颜色
                if (options.trHoverColor != "") {
                    $trs.hover(function () {
                        $(this).addClass("XTableList_trHover");
                    }, function () {
                        $(this).removeClass("XTableList_trHover");
                    });
                }
                //单击行颜色
                if (options.trClickColor != "") {
                    $trs.click(function () {
                        $trs.removeClass("XTableList_trClick");
                        $(this).addClass("XTableList_trClick");
                    });
                }
                //奇偶行颜色
                if (options.trEvenColor != "") {
                    $trs.each(function (i) {
                        if (i % 2 == 0) {
                            $(this).addClass("XTableList_trEven");
                        }
                    });
                }
                if (options.trOddColor != "") {
                    $trs.each(function (i) {
                        if (i % 2 == 1) {
                            $(this).addClass("XTableList_trOdd");
                        }
                    });
                }
                /******表格样式相关结束****/


                /******全选相关开始*****/
                //单击全选时
                $(options.checkAllClass).click(function () {
                    var $ckAll = $(this).closest(options.tableClass).find(options.checkAllClass);
                    var $ckItem = $(this).closest(options.tableClass).find(options.checkItemClass);
                    if (this.checked) {
                        $ckItem.prop({ "checked": true });
                    } else {
                        $ckItem.prop({ "checked": false });
                    }
                    funs.GetCheckBoxIDs($ckAll, $ckItem);
                });
                //单击列表中的checkbox时
                $(options.checkItemClass).click(function () {
                    var $ckAll = $(this).closest(options.tableClass).find(options.checkAllClass);
                    var $ckItem = $(this).closest(options.tableClass).find(options.checkItemClass);
                    var flag = 1;
                    $ckItem.each(function () {
                        if (!this.checked) {
                            flag = 0;
                            return false;
                        }
                    });
                    if (flag == 1) {
                        $ckAll.prop({ "checked": true });
                    } else {
                        $ckAll.prop({ "checked": false });
                    }
                    funs.GetCheckBoxIDs($ckAll, $ckItem);
                });
                /******全选相关结束*****/

            });
        }
    });
    var funs = {
        Defaults: {
            tableClass: ".XTableList",//table的class
            trHoverColor: "#e0ecff",//行滑过时的颜色
            trClickColor: "",//单击行后的颜色
            trNoHoverClass: ".XCLTableNoHover",//无需设置颜色的行class
            trEvenColor: "#f9f9f9",//偶数行的颜色0开始
            trOddColor: "",//奇数行的颜色
            checkAllClass: ".XCLTableCheckAll",//全选按钮class
            checkItemClass: ".XCLTableCheckItem",//选择框的class
            checkedTrColor: "#fffec9"//选中行的颜色
        },
        Init: function (options) {
            //样式
            $("head").append("<style type='text/css'>.XTableList_trHover{background:" + options.trHoverColor + "!important;} " +
                                    ".XTableList_trClick{background:" + options.trClickColor + "!important;} " +
                                    ".XTableList_trEven{background:" + options.trEvenColor + ";} " +
                                    ".XTableList_trOdd{background:" + options.trOddColor + ";}" +
                                    ".XTableList_trChecked{background:" + options.checkedTrColor + "!important;}" +
                                    "</style>");
            //当子项都为选中时，此时选中全选项
            $(options.tableClass).each(function () {
                var $ckAll = $(this).closest(options.tableClass).find(options.checkAllClass);
                var $ckItem = $(this).closest(options.tableClass).find(options.checkItemClass);
                var isAllChecked = 1;
                $ckItem.each(function () {
                    if (!this.checked) {
                        isAllChecked = 0; return false;
                    }
                });
                if (isAllChecked == 1) {
                    $ckAll.prop({ "checked": true });
                }else{
                    $ckAll.prop({ "checked": false });
                }
                
                funs.GetCheckBoxIDs($ckAll, $ckItem);
            });
            
        },
        //将列表中的checkbox的value的数组形式存到全选的checkbox的value中
        GetCheckBoxIDs: function (ckAll, ckItem) {
            var v = [];
            ckItem.each(function () {
                if (this.checked) {
                    $(this).closest("tr").addClass("XTableList_trChecked");
                    v.push(this.value);
                } else {
                    $(this).closest("tr").removeClass("XTableList_trChecked");
                }
            });
            ckAll.val(v.toString());
        }
    }
})(jQuery);