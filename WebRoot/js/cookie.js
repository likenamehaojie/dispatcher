//�½�cookie��
//hoursΪ���ַ���ʱ,cookie����������������Ự������hoursΪ����0ʱ,��������һ��ʧЧ��cookie,���cookie�Ḳ���Ѿ���������ͬ����ͬpath��cookie��������cookie���ڣ���
function setCookie(name,value,days,path){
    var name = escape(name);
    var value = escape(value);
    var expires = new Date();
    expires.setTime(expires.getTime() + days*24*3600000);
    path = path == "" ? "" : ";path=" + path;
    _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();
    document.cookie = name + "=" + value + _expires + path;
}
//��ȡcookieֵ
function getCookieValue(name){
    var name = escape(name);
    //��cookie���ԣ��⽫�����ĵ�������cookie
    var allcookies = document.cookie;       
    //������Ϊname��cookie�Ŀ�ʼλ��
    name += "=";
    var pos = allcookies.indexOf(name);    
    //����ҵ��˾��и����ֵ�cookie����ô��ȡ��ʹ������ֵ
    if (pos != -1){                                             //���posֵΪ-1��˵������"version="ʧ��
        var start = pos + name.length;                  //cookieֵ��ʼ��λ��
        var end = allcookies.indexOf(";",start);        //��cookieֵ��ʼ��λ����������һ��";"��λ��,��cookieֵ��β��λ��
        if (end == -1) end = allcookies.length;        //���endֵΪ-1˵��cookie�б���ֻ��һ��cookie
        var value = allcookies.substring(start,end);  //��ȡcookie��ֵ
        return unescape(value);                           //��������      
        }   
    else return "";                                             //����ʧ�ܣ����ؿ��ַ���
}
//ɾ��cookie
function deleteCookie(name,path){
    var name = escape(name);
    var expires = new Date(0);
    path = path == "" ? "" : ";path=" + path;
    document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;
}