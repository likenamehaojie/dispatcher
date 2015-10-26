/** 
 * Map����ʵ��Map���� 
 *  
 *  
	--����
	var map=new Map();
	map.put("1:add","");


	--�޸�
	if(map.containsKey("1:add")){
		map.remove("1:add");
		map.put("1:add","");
	}else{
		map.put("1:edit","");
	}

	--ɾ��
	if(map.containsKey("1:add")){
		map.remove("1:add");
	}else if(map.containsKey("1:edit")){
		map.remove("1:edit");
	}else if(map.containsKey("1:del")){
		map.remove("1:del");
	}else{
		map.put("1:del");
	}

 * size() ��ȡMapԪ�ظ���  
 * isEmpty() �ж�Map�Ƿ�Ϊ��  
 * clear() ɾ��Map����Ԫ��  
 * put(key, value) ��Map������Ԫ�أ�key, value)  
 * remove(key) ɾ��ָ��key��Ԫ�أ��ɹ�����true��ʧ�ܷ���false  
 * get(key) ��ȡָ��key��Ԫ��ֵvalue��ʧ�ܷ���null  
 * element(index) ��ȡָ��������Ԫ�أ�ʹ��element.key��element.value��ȡkey��value����ʧ�ܷ���null  
 * containsKey(key) �ж�Map���Ƿ���ָ��key��Ԫ��  
 * containsValue(value) �ж�Map���Ƿ���ָ��value��Ԫ��  
 * keys() ��ȡMap������key�����飨array��  
 * values() ��ȡMap������value�����飨array�� 
 */  
function Map() {  
    this.elements = new Array();  
  
    // ��ȡMapԪ�ظ���  
    this.size = function() {  
        return this.elements.length;  
    },  
  
    // �ж�Map�Ƿ�Ϊ��  
    this.isEmpty = function() {  
        return (this.elements.length < 1);  
    },  
  
    // ɾ��Map����Ԫ��  
    this.clear = function() {  
        this.elements = new Array();  
    },  
  
    // ��Map������Ԫ�أ�key, value)  
    this.put = function(_key, _value) {  
        if (this.containsKey(_key) == true) {  
            if (this.containsValue(_value)) {  
                if (this.remove(_key) == true) {  
                    this.elements.push( {  
                        key : _key,  
                        value : _value  
                    });  
                }  
            } else {  
                this.elements.push( {  
                    key : _key,  
                    value : _value  
                });  
            }  
        } else {  
            this.elements.push( {  
                key : _key,  
                value : _value  
            });  
        }  
    },  
  
    // ɾ��ָ��key��Ԫ�أ��ɹ�����true��ʧ�ܷ���false  
    this.remove = function(_key) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    this.elements.splice(i, 1);  
                    return true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    },  
  
    // ��ȡָ��key��Ԫ��ֵvalue��ʧ�ܷ���null  
    this.get = function(_key) {  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    return this.elements[i].value;  
                }  
            }  
        } catch (e) {  
            return null;  
        }  
    },  
  
    // ��ȡָ��������Ԫ�أ�ʹ��element.key��element.value��ȡkey��value����ʧ�ܷ���null  
    this.element = function(_index) {  
        if (_index < 0 || _index >= this.elements.length) {  
            return null;  
        }  
        return this.elements[_index];  
    },  
  
    // �ж�Map���Ƿ���ָ��key��Ԫ��  
    this.containsKey = function(_key) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    bln = true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    },  
  
    // �ж�Map���Ƿ���ָ��value��Ԫ��  
    this.containsValue = function(_value) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].value == _value) {  
                    bln = true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    },  
  
    // ��ȡMap������key�����飨array��  
    this.keys = function() {  
        var arr = new Array();  
        for (i = 0; i < this.elements.length; i++) {  
			//alert(this.elements[i].key);
            arr.push(this.elements[i].key);  
        }  
        return arr;  
    },  
  
    // ��ȡMap������value�����飨array��  
    this.values = function() {  
        var arr = new Array();  
        for (i = 0; i < this.elements.length; i++) {  
            arr.push(this.elements[i].value);  
        }  
        return arr;  
    };  
}  