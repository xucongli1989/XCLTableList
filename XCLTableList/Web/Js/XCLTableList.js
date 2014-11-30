//by:xcl @2012.8  qq:80213876
; (function ($) {
    $.extend({
        XCLTableList: function (options) {
            options = $.extend({}, funs.Defaults, options);
            funs.Init(options);
            $(options.tableClass).each(function () {
                var $trs = null;
                if ($(this).children("tbody").length > 0) {//��������Զ���tbody��ǩ
                    $trs = options.trNoHoverClass == "" ? $(this).children().children() : $(this).children().children().not(options.trNoHoverClass);
                } else {
                    $trs = options.trNoHoverClass == "" ? $(this).children() : $(this).children().not(options.trNoHoverClass);
                }
                //��������ɫ
                if (options.trHoverColor != "") {
                    $trs.hover(function () {
                        $(this).addClass("XCLTableList_trHover");
                    }, function () {
                        $(this).removeClass("XCLTableList_trHover");
                    });
                }
                //��������ɫ
                if (options.trClickColor != "") {
                    $trs.click(function () {
                        $trs.removeClass("XCLTableList_trClick");
                        $(this).addClass("XCLTableList_trClick");
                    });
                }
                //��ż����ɫ
                if (options.trEvenColor != "") {
                    $trs.each(function (i) {
                        if (i % 2 == 0) {
                            $(this).addClass("XCLTableList_trEven");
                        }
                    });
                }
                if (options.trOddColor != "") {
                    $trs.each(function (i) {
                        if (i % 2 == 1) {
                            $(this).addClass("XCLTableList_trOdd");
                        }
                    });
                }
                /******�����ʽ��ؽ���****/


                /******ȫѡ��ؿ�ʼ*****/
                //����ȫѡʱ
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
                //�����б��е�checkboxʱ
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
                /******ȫѡ��ؽ���*****/

            });
        }
    });
    var funs = {
        Defaults: {
            tableClass: ".XCLTableList",//table��class
            trHoverColor: "#e0ecff",//�л���ʱ����ɫ
            trClickColor: "",//�����к����ɫ
            trNoHoverClass: ".XCLTableNoHover",//����������ɫ����class
            trEvenColor: "#f9f9f9",//ż���е���ɫ0��ʼ
            trOddColor: "",//�����е���ɫ
            checkAllClass: ".XCLTableCheckAll",//ȫѡ��ťclass
            checkItemClass: ".XCLTableCheckItem",//ѡ����class
            checkedTrColor: "#fffec9"//ѡ���е���ɫ
        },
        Init: function (options) {
            //��ʽ
            $("head").append("<style type='text/css'>.XCLTableList_trHover{background:" + options.trHoverColor + "!important;} " +
                                    ".XCLTableList_trClick{background:" + options.trClickColor + "!important;} " +
                                    ".XCLTableList_trEven{background:" + options.trEvenColor + ";} " +
                                    ".XCLTableList_trOdd{background:" + options.trOddColor + ";}" +
                                    ".XCLTableList_trChecked{background:" + options.checkedTrColor + "!important;}" +
                                    "</style>");
            //�����Ϊѡ��ʱ����ʱѡ��ȫѡ��
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
        //���б��е�checkbox��value��������ʽ�浽ȫѡ��checkbox��value��
        GetCheckBoxIDs: function (ckAll, ckItem) {
            var v = [];
            ckItem.each(function () {
                if (this.checked) {
                    $(this).closest("tr").addClass("XCLTableList_trChecked");
                    v.push(this.value);
                } else {
                    $(this).closest("tr").removeClass("XCLTableList_trChecked");
                }
            });
            ckAll.val(v.toString());
        }
    }
})(jQuery);