from copy import deepcopy

dict_vni_to_unicode = {
    "AØ": "À",
    "AÙ":"Á",
    "AÂ": "Â",
    "AÕ":"Ã",
    "EØ":"È",
    "EÙ":"É",
    "EÂ":"Ê",
    "Ì":"Ì",
    "Í":"Í",
    "OØ":"Ò",
    "OÙ":"Ó",
    "OÂ":"Ô",
    "OÕ":"Õ",
    "UØ":"Ù",
    "UÙ":"Ú",
    "YÙ":"Ý",
    "aø":"à",
    "aù":"á",
    "aâ":"â",
    "aõ":"ã",
    "eø":"è",
    "eù":"é",
    "eù":"é",
    "eâ":"ê",
    "ì":"ì",
    "í":"í",
    "oø":"ò",
    "où":"ó",
    "oâ":"ô",
    "oõ":"õ",
    "oõ":"õ",
    "uø":"ù",
    "uù":"ú",
    "yù":"ý",
    "AÊ":"Ă",
    "aê":"ă",
    "Ñ":"Đ",
    "ñ":"đ",
    "Ó":"Ĩ",
    "ó":"ĩ",
    "UÕ":"Ũ",
    "uõ":"ũ",
    "Ô":"Ơ",
    "ô":"ơ",
    "Ö":"Ư",
    "ö":"ư",
    "AÏ":"Ạ",
    "aï":"ạ",
    "AÛ":"Ả",
    "aû":"ả",
    "AÁ":"Ấ",
    "aá":"ấ",
    "AÀ":"Ầ",
    "aà":"ầ",
    "AÅ":"Ẩ",
    "aå":"ẩ",
    "AÃ":"Ẫ",
    "aã":"ẫ",
    "AÄ":"Ậ",
    "aä":"ậ",
    "AÉ":"Ắ",
    "aé":"ắ",
    "AÈ":"Ằ",
    "aè":"ằ",
    "AÚ":"Ẳ",
    "aú":"ẳ",
    "AÜ":"Ẵ",
    "aü":"ẵ",
    "AË":"Ặ",
    "aë":"ặ",
    "EÏ":"Ẹ",
    "eï":"ẹ",
    "EÛ":"Ẻ",
    "eû":"ẻ",
    "EÕ":"Ẽ",
    "eõ":"ẽ",
    "EÁ":"Ế",
    "eá":"ế",
    "EÀ":"Ề",
    "eà":"ề",
    "EÅ":"Ể",
    "eå":"ể",
    "EÃ":"Ễ",
    "eã":"ễ",
    "EÄ":"Ệ",
    "eä": "ệ",
    "Æ":"Ỉ",
    "æ": "ỉ",
    "Ò":"Ị",
    "ò":"ị",
    "OÏ":"Ọ",
    "oï":"ọ",
    "OÛ":"Ỏ",
    "oû":"ỏ",
    "OÁ":"Ố",
    "oá":"ố",
    "OÀ":"Ồ",
    "oà":"ồ",
    "OÅ":"Ổ",
    "oå":"ổ",
    "OÃ":"Ỗ",
    "oã":"ỗ",
    "OÄ":"Ộ",
    "oä":"ộ",
    "ÔÙ":"Ớ",
    "ôù":"ớ",
    "ÔØ":"Ờ",
    "ôø":"ờ",
    "ÔÛ":"Ở",
    "ôû":"ở",
    "ÔÕ":"Ỡ",
    "ôõ":"ỡ",
    "ÔÏ":"Ợ",
    "ôï":"ợ",
    "UÏ":"Ụ",
    "uï":"ụ",
    "UÛ":"Ủ",
    "uû":"ủ",
    "ÖÙ":"Ứ",
    "öù":"ứ",
    "ÖØ":"Ừ",
    "öø":"ừ",
    "ÖÛ":"Ử",
    "öû":"ử",
    "ÖÕ":"Ữ",
    "öõ":"ữ",
    "ÖÏ":"Ự",
    "öï":"ự",
    "YØ":"Ỳ",
    "yø":"ỳ",
    "Î":"Ỵ",
    "î":"ỵ",
    "YÛ":"Ỷ",
    "yû":"ỷ",
    "YÕ":"Ỹ",
    "yõ":"ỹ"
}


dict_unicode_to_vni = {v:k for k, v in dict_vni_to_unicode.items()}

columns_vietnamese = {"TENGIAY", "TENKHO", "TENMUI", 
                      "TENNVIEN", "TENKH",
                      "TENDE", "TENSUON",
                      "TENCA", "TENQUAI",
                      "GHICHUDE", "GHICHUQUAI",
                      "GHICHU", "DIACHI", "DIENGIAI",
                      "DIENGIAIDONG", "DIENGIAIPHIEU",
                      "TRANGTRIDE", "TRANGTRIQUAI", "INHIEU",
                      "TENMAU", "TENMAUDE", "TENMAUCA",
                      "TENMAUQUAI", "TENMAUSUON",
                      "TENMAUGOT", "DienGiai", 
                      "TENFORM", "TENTHODE", "TENTHOQUAI",
                      "tengiay"}


def convert_vni_to_unicode(vni_str):
    result = ""
    if vni_str is None or len(vni_str) == 0:
        return result
    start = 0
    
    while start < len(vni_str):
        if vni_str[start: start+2] in dict_vni_to_unicode.keys():
            result += dict_vni_to_unicode[vni_str[start:start+2]]
            start += 2
        elif vni_str[start] in dict_vni_to_unicode.keys():
            result += dict_vni_to_unicode[vni_str[start]]
            start += 1
        else:
            result += vni_str[start]
            start += 1

    return result


def convert_unicode_to_vni(unicode_str):
    result = ""
    if unicode_str is None or len(unicode_str) == 0:
        return result
    
    for i in range(0, len(unicode_str)):
        result += dict_unicode_to_vni.get(unicode_str[i],unicode_str[i])
    return result

def check_need_convert(key):
    return key in columns_vietnamese
    # for sub_name in columns_vietnamese:
    #     if sub_name in key:
    #         return True
    # return False

def convert_data_to_save_database(data):
    _data = deepcopy(data)
    for k, v in _data.items():
        if v is not None:
            if type(v) is str:
                if check_need_convert(k):
                    _data[k] = f"'{convert_unicode_to_vni(v)}'"
                else:
                    _data[k] = f"'{v}'"
            else:
                _data[k] = str(v)
               
    return _data