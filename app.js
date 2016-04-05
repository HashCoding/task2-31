(function() {
    
    var addEvent = function(element, type, handle) {
        if(element.addEventListener) {
            element.addEventListener(type, handle, false);
        } else if(element.attachEvent) {
            element.attachEvent('on'+type, handle);
        } else {
            element['on'+type] = handle;
        }
    }
    
    var citySchool = {
        '黑龙江': [
            '哈尔滨工业大学',
            '哈尔滨工程大学',
            '哈尔滨理工大学'
        ],
        '北京': [
            '清华大学',
            '北京大学',
            '北京航天航空大学',
            '北京邮电大学'
        ]
    }
    
    
    var isStudentNode = document.getElementsByClassName('is-student')[0];
    var locationNode = document.getElementsByClassName('location')[0];
    var companyNode = document.getElementsByClassName('company')[0];
    
    var cityList = document.getElementsByClassName('city-list')[0];
    var schoolList = document.getElementsByClassName('school-list')[0];
    
    // 是否是学生的处理函数
    var isStudentToggle = function(isStudentValue) {
        if(isStudentValue === 'Y') {
            locationNode.style.display = 'block';
            companyNode.style.display = 'none'; 
        } else{
            locationNode.style.display = 'none';
            companyNode.style.display = 'block';
        }
    }
    
    
    // 事件委托，绑定是否是学生的 audio 选择事件
    addEvent(isStudentNode, 'click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.tagName.toLowerCase() === 'input') {
            isStudentToggle(target.value);
        }
    })
    
    // 事件委托，给是学生的情况下添加事件，正确弹出选择框
    addEvent(locationNode, 'click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.tagName.toLowerCase() === 'input') {
            if(target.name === 'location-city') {
                cityList.style.display = 'block';
                schoolList.style.display = 'none';
            } else if(target.name === 'location-school') {
                schoolList.style.display = 'block';
                cityList.style.display = 'none';
            }
        }
    })
    
    // 给省份选项框委托事件
    addEvent(cityList, 'click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.tagName.toLowerCase() === 'li') {
            document.getElementsByName('location-city')[0].value = target.innerHTML;
            cityList.style.display = 'none';
            
            // 填充学校数据
            var str = '';
            for(var i = 0, l = citySchool[target.innerHTML].length; i < l; i++) {
                str += '<li>' + citySchool[target.innerHTML][i] + '</li>'
            }
            schoolList.innerHTML = str;
        }
    });
    
    // 给学校选项框委托事件
    addEvent(schoolList, 'click', function(e) {
         e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.tagName.toLowerCase() === 'li') {
            document.getElementsByName('location-school')[0].value = target.innerHTML;
            schoolList.style.display = 'none';
        }
    })
    
    var datainit = function() {
        var str = '';
        for (var city in citySchool) {
            str += '<li>' + city + '</li>'; 
        }
        cityList.innerHTML = str;
    }
    
    datainit();
    
})();