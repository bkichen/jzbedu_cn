var currentindex=1;
$("#flashBg").css("background-color",$("#flash1").attr("name"));
function changeflash(i) {
currentindex=i;
for (j=1;j<=3;j++){
if (j==i) 
{$("#flash"+j).fadeIn("normal");
$("#flash"+j).css("display","block");
$("#f"+j).removeClass();
$("#f"+j).addClass("dq");
$("#flashBg").css("background-color",$("#flash"+j).attr("name"));
}
else
{$("#flash"+j).css("display","none");
$("#f"+j).removeClass();
$("#f"+j).addClass("no");}
}}
function startAm(){
timerID = setInterval("timer_tick()",3000);
}
function stopAm(){
clearInterval(timerID);
}
function timer_tick() {
    currentindex=currentindex>=3?1:currentindex+1;
changeflash(currentindex);}
$(document).ready(function(){
$(".flash_bar div").mouseover(function(){stopAm();}).mouseout(function(){startAm();});
startAm();
});


function trim(str) {
    return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}

function strlen(str) {
    var len = 0;
    for(var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ?  2 : 1;
    }
    return len;
}

function check_baoming_home(s){
	var baoming_name=trim($("#baoming_name").val());
	var baoming_tel=trim($("#baoming_tel").val());
	var baoming_email=trim($("#baoming_email").val());
	var baoming_qq=trim($("#baoming_qq").val());
	
	if ( s==1 ){
		if ( baoming_name=="请输入您真实的名字" ){
			$("#baoming_name").val(""); 
		}
	}
	if ( s==2 ){
		if ( baoming_tel=="请输入您的手机号码" ){
			$("#baoming_tel").val(""); 
		}
	}
	if ( s==3 ){
		if ( baoming_email=="请输入您常用的邮箱" ){
			$("#baoming_email").val(""); 
		}
	}
	if ( s==4 ){
		if ( baoming_qq=="QQ号码" ){
			$("#baoming_qq").val(""); 
		}
	}
}

function check_baoming_home_out(s){
	var baoming_name=trim($("#baoming_name").val());
	var baoming_tel=trim($("#baoming_tel").val());
	var baoming_email=trim($("#baoming_email").val());
	var baoming_qq=trim($("#baoming_qq").val());
	
	if ( s==1 ){
		if ( baoming_name=="" ){
			$("#baoming_name").val("请输入您真实的名字"); 
		}
	}
	if ( s==2 ){
		if ( baoming_tel=="" ){
			$("#baoming_tel").val("请输入您的手机号码"); 
		}
	}
	if ( s==3 ){
		if ( baoming_email=="" ){
			$("#baoming_email").val("请输入您常用的邮箱"); 
		}
	}
	if ( s==4 ){
		if ( baoming_qq=="" ){
			$("#baoming_qq").val("QQ号码"); 
		}
	}
}

function baoming_home_post(pages){
	var baoming_name=trim($("#baoming_name").val());
	var baoming_tel=trim($("#baoming_tel").val());
	var baoming_email=trim($("#baoming_email").val());
	var baoming_qq=trim($("#baoming_qq").val());
	
	var msgerrot = "";
	if ( strlen(baoming_name)< 2 || strlen(baoming_name) > 30 || baoming_name=='请输入您真实的名字' ){
		msgerrot = msgerrot + "请填写正确的姓名  (中文名或英文名)\n\n";
	}
	if ( strlen(baoming_tel)< 11 || strlen(baoming_tel) > 16 || baoming_tel=='请输入手机号码,便于课电话' ){
		msgerrot = msgerrot + "请填写正确的电话 (如：020-37223023 或 13800138000)\n\n";
	}
	if ( baoming_email!=""  || baoming_email=='请输入您常用的邮箱'){
		if(baoming_email.search(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
			msgerrot = msgerrot + "请填写正确的电子邮箱! (如：test@test.com)\n\n";
		}
	}else{
		msgerrot = msgerrot + "请填写正确的电子邮箱! (如：test@test.com)\n\n";
	}
	
	if ( msgerrot!="" ){
		msgerrot = "提示：\n\n" + msgerrot;
		alert(msgerrot);
	}else{
		cms_baoming_post();

		$.post("ajax.php",{ code: "baoming_home", baoming_name: baoming_name, baoming_tel: baoming_tel, baoming_email: baoming_email, baoming_qq: baoming_qq },function(data){
			if (data=="checkdata"){
				alert("请正确填写全部资料!\n\n谢谢");
			}else if (data=="success"){
				if ( pages==0 ){
					location="http://www.51jzb.net/successful.html?index";
				}else if ( pages==1 ){
					location="http://www.51jzb.net/successful.html?free";
				}else{
					location="http://www.51jzb.net/successful.html?index";
				}
				//alert("提交成功，我们的教务课专家会尽快联系您\n\n感谢你对金嘴巴英语的支持!\n\n谢谢");
				$("#baoming_name").val("请输入您真实的名字"); 
				$("#baoming_tel").val("请输入手机号码,便于课电话"); 
				$("#baoming_email").val("请输入您常用的邮箱"); 
				$("#baoming_qq").val("QQ号码"); 
			}else if (data=="repeat_user"){
				alert("对不起，您已经提交过了");
			}else{
				alert("对不起，数据出错");
			}
	  });
	}
}


function js_show_course_list(sid){
	var cid_att=$("#cid_att").html();
	
	cid_att=cid_att.split(",")
	for (i = 0; i < cid_att.length; i++){
		tempsid=cid_att[i];
		if (tempsid==sid){
			$("#show_course_div_"+tempsid).show();
		}else{
			$("#show_course_div_"+tempsid).hide();
		}
	}
}

function js_show_course_price(sid,kecheng,price){
	$("#kecheng_"+sid).html(kecheng);
	$("#price_"+sid).html(price);
}

function js_check_baoming(){
	var zsbm_name_en=trim($("#zsbm_name_en").val());
	var zsbm_name_cn=trim($("#zsbm_name_cn").val());
	var zsbm_mobile=trim($("#zsbm_mobile").val());
	var zsbm_code=trim($("#zsbm_code").val());
	var zsbm_province=trim($("#zsbm_province").val());
	var zsbm_city=trim($("#zsbm_city").val());
	var zsbm_address=trim($("#zsbm_address").val());
	
	var course_price=$("#course_price").val();
	var zsbm_sex="男";
	var zsbm_agree=1;
	if ( document.getElementById("zsbm_sex2").checked ){
		zsbm_sex="女";
	}
	if ( document.getElementById("zsbm_agree").checked ){
		zsbm_agree=2;
	}
	
	var msgerrot = "";
	if ( strlen(zsbm_name_en)< 3 || strlen(zsbm_name_en) > 30){
		msgerrot = msgerrot + "请填写正确的英文名\n\n";
	}
	if ( strlen(zsbm_name_cn)< 2 || strlen(zsbm_name_cn) > 30){
		msgerrot = msgerrot + "请填写正确的中文名\n\n";
	}
	if ( strlen(zsbm_mobile)< 8 || strlen(zsbm_mobile) > 18){
		msgerrot = msgerrot + "请填写正确的联系电话\n\n";
	}
	if ( strlen(zsbm_code) !=6 ){
		msgerrot = msgerrot + "请填写正确的邮编\n\n";
	}
	if ( strlen(zsbm_province)< 3 || strlen(zsbm_province) > 20 || strlen(zsbm_city)< 3 || strlen(zsbm_city) > 20 || strlen(zsbm_address)< 5 || strlen(zsbm_address) > 80){
		msgerrot = msgerrot + "请填写正确的教材接收地址, 格式如：XX省XX市XX地址\n\n";
	}
	if ( zsbm_agree!=2 ){
		msgerrot = msgerrot + "请同意认可和勾选服务协议\n\n";
	}
	if ( msgerrot!="" ){
		msgerrot = "提示：\n\n" + msgerrot;
		alert(msgerrot);
	}else{
		$("#show_buy_one").hide();
		$("#show_buy_two").show();
		
		$('#cq_name_cn').html('<span class="texe_1">英文名</span>' + zsbm_name_en );
		$('#cq_name_en').html('<span class="texe_1">中文名</span>' + zsbm_name_cn );
		$('#cq_name_sx').html('<span class="texe_1">性别</span>' + zsbm_sex );
		$('#cq_name_mo').html('<span class="texe_1">联系电话</span>' + zsbm_mobile );
		$('#cq_name_co').html('<span class="texe_1">邮编</span>' + zsbm_code );
		$('#cq_name_dz').html('<span class="texe_1">教材接收地址</span>' + zsbm_province + '省 ' + zsbm_city + '市 ' + zsbm_address );
		$('#cq_name_pa').html('<span class="texe_1">课程价格</span>￥'+course_price+'元');
		$('#cq_name_pb').html('<span class="texe_1">结算金额</span><strong style="color:#db0918;">￥'+course_price+'元</strong>');
	}
}

function js_post_alipay(){
	var zsbm_name_en=trim($("#zsbm_name_en").val());
	var zsbm_name_cn=trim($("#zsbm_name_cn").val());
	var zsbm_mobile=trim($("#zsbm_mobile").val());
	var zsbm_code=trim($("#zsbm_code").val());
	var zsbm_province=trim($("#zsbm_province").val());
	var zsbm_city=trim($("#zsbm_city").val());
	var zsbm_address=trim($("#zsbm_address").val());
	var hidden_course_cn_name=$("#hidden_course_cn_name").val();
	
	var trade_no = trim($("#WIDout_trade_no").val());
	
	var zsbm_sex=0;
	if ( document.getElementById("zsbm_sex2").checked ){
		zsbm_sex=1;
	}
	
	zsbm_address = zsbm_province + "省 " + zsbm_city + "市 " + zsbm_address;
	
	var course_class=$("#course_class").val();
	var course_sid=$("#course_sid").val();
	var course_id=$("#course_id").val();
	var course_price=$("#course_price").val();
	var pay_code="alipay";
	var pay_page_type="web";
	
	$.getJSON("http://cps.jzbedu.cn/zsbaoming.php?callback=?", { zsbm_name_en:zsbm_name_en, zsbm_name_cn:zsbm_name_cn, zsbm_mobile:zsbm_mobile, zsbm_code:zsbm_code, zsbm_address:zsbm_address, hidden_course_cn_name: hidden_course_cn_name, trade_no:trade_no, zsbm_sex:zsbm_sex, course_class:course_class, course_sid:course_sid, course_id:course_id, course_price:course_price, pay_code:pay_code, pay_page_type:pay_page_type } ,function(data){

	});
}


function js_post_kuaiqian(){
	var zsbm_name_en=trim($("#zsbm_name_en").val());
	var zsbm_name_cn=trim($("#zsbm_name_cn").val());
	var zsbm_mobile=trim($("#zsbm_mobile").val());
	var zsbm_code=trim($("#zsbm_code").val());
	var zsbm_province=trim($("#zsbm_province").val());
	var zsbm_city=trim($("#zsbm_city").val());
	var zsbm_address=trim($("#zsbm_address").val());
	var hidden_course_cn_name=$("#hidden_course_cn_name").val();
	
	var trade_no = trim($("#kuaiqian_trade_no").val());
	
	var zsbm_sex=0;
	if ( document.getElementById("zsbm_sex2").checked ){
		zsbm_sex=1;
	}
	
	zsbm_address = zsbm_province + "省 " + zsbm_city + "市 " + zsbm_address;
	
	var course_class=$("#course_class").val();
	var course_sid=$("#course_sid").val();
	var course_id=$("#course_id").val();
	var course_price=$("#course_price").val();
	var pay_code="kuaiqian";
	var pay_page_type="web";
	
	$.getJSON("http://cps.jzbedu.cn/zsbaoming.php?callback=?", { zsbm_name_en:zsbm_name_en, zsbm_name_cn:zsbm_name_cn, zsbm_mobile:zsbm_mobile, zsbm_code:zsbm_code, zsbm_address:zsbm_address, hidden_course_cn_name: hidden_course_cn_name, trade_no:trade_no, zsbm_sex:zsbm_sex, course_class:course_class, course_sid:course_sid, course_id:course_id, course_price:course_price, pay_code:pay_code, pay_page_type:pay_page_type } ,function(data){

	});
}