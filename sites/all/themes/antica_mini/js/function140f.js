
// ************************************************
// Избранной
// ************************************************
var favouriteGoods = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    goods = [];

    // Constructor
    function Item(nid,  count, name, price, measure, img) {
        this.nid = nid;
        this.count = count;
        this.name = name;
        this.price = price;
        this.measure = measure;
        this.img = img;

    }

    // Save cart
    function saveCart() {
        window.localStorage.setItem('favouriteGoods', JSON.stringify(goods));
    }

    // Load cart
    function loadCart() {
        if (window.localStorage.getItem('favouriteGoods') != null && window.localStorage.getItem('favouriteGoods') != "") goods = JSON.parse(window.localStorage.getItem('favouriteGoods'));
    }
    if (window.localStorage.getItem("favouriteGoods") != null && window.localStorage.getItem("favouriteGoods") != "") {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function(nid, count,  name, price, measure, img) {
        for(var item in goods) {
            if(goods[item].nid === nid) {

                goods[item].count = goods[item].count + count;
                saveCart();
                return;
            }
        }
        var item = new Item(nid,  count, name, price,measure, img);
        goods.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(nid, count) {
        for(var i in goods) {
            if (goods[i].nid === nid) {
                goods[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(nid) {
        for(var item in goods) {
            if(goods[item].nid === nid) {
                goods.splice(item, 1);
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(nid) {
        for(var item in goods) {
            if(goods[item].nid === nid) {
                goods.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        goods = [];
        saveCart();
    }

    // Count cart
    obj.totalCount = function() {
        var totalCount = 0;
        for(var item in goods) {
            totalCount += goods[item].count;
        }
        return totalCount;
    }

    // Count cart
    obj.goodsCount = function() {
        var goodsCount = 0;
        for(var item in goods) {
            if (goods[item].nid) goodsCount++;
        }
        return goodsCount;
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for(i in goods) {
            item = goods[i];
            itemCopy = {};
            for(p in item) {
                itemCopy[p] = item[p];

            }
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    // List cart Array
    obj.listCartArray = function() {
        var cartCopyArray = [];
        for(var item in goods) {
            if (goods[item].nid) cartCopyArray.push(goods[item].nid)
        }
        return cartCopyArray;
    }

    return obj;
})();



// ************************************************
// Избранные коллекции
// ************************************************
var favouriteCollects = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    collects = [];

    // Constructor
    function Item(tid,  count, name, price, measure, img) {
        this.tid = tid;
        this.count = count;
        this.name = name;
        this.price = price;
        this.measure = measure;
        this.img = img;

    }

    // Save cart
    function saveCart() {
        window.localStorage.setItem('favouriteCollects', JSON.stringify(collects));
    }

    // Load cart
    function loadCart() {
        if (window.localStorage.getItem('favouriteCollects') != null && window.localStorage.getItem('favouriteCollects') != "") collects = JSON.parse(window.localStorage.getItem('favouriteCollects'));
    }
    if (window.localStorage.getItem("favouriteCollects") != null && window.localStorage.getItem('favouriteCollects') != "") {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function(tid, count,  name, price, measure, img) {
        for(var item in collects) {
            if(collects[item].tid === tid) {

                collects[item].count = collects[item].count + count;
                saveCart();
                return;
            }
        }
        var item = new Item(tid,  count, name, price,measure, img);
        collects.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(tid, count) {
        for(var i in collects) {
            if (collects[i].tid === tid) {
                collects[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(tid) {
        for(var item in collects) {
            if(collects[item].tid === tid) {
                collects.splice(item, 1);
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(tid) {
        for(var item in collects) {
            if(collects[item].tid === tid) {
                collects.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        collects = [];
        saveCart();
    }

    // Count cart
    obj.totalCount = function() {
        var totalCount = 0;
        for(var item in collects) {
            totalCount += collects[item].count;
        }
        return totalCount;
    }

    // Count cart
    obj.goodsCount = function() {
        var goodsCount = 0;
        for(var item in collects) {
            if (collects[item].tid) goodsCount++;
        }
        return goodsCount;
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for(i in collects) {
            item = collects[i];
            itemCopy = {};
            for(p in item) {
                itemCopy[p] = item[p];

            }
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    // List cart Array
    obj.listCartArray = function() {
        var cartCopyArray = [];
        for(var item in collects) {
            if (collects[item].tid) cartCopyArray.push(collects[item].tid)
        }
        return cartCopyArray;
    }

    return obj;
})();




// ************************************************
// Shopping Cart API
// ************************************************
var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(nid,  count, name, price, measure, img, measure_id) {
        this.nid = nid;
        this.count = count;
        this.name = name;
        this.price = price;
        this.measure = measure;
        this.measure_id = measure_id;
        this.img = img;

    }

    // Save cart
    function saveCart() {
        window.localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        if (window.localStorage.getItem('shoppingCart') != null && window.localStorage.getItem('shoppingCart') != "") cart = JSON.parse(window.localStorage.getItem('shoppingCart'));
    }
    if (window.localStorage.getItem("shoppingCart") != null && window.localStorage.getItem('shoppingCart') != "") {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function(nid, count,  name, price, measure, img, measure_id) {
        for(var item in cart) {
            if(cart[item].nid == nid) {

                cart[item].count = cart[item].count + count;
                saveCart();
                return;
            }
        }
        //console.log('Добавили - ' + count + " - " + name);
        var item = new Item(nid,  count, name, price,measure, img, measure_id);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(nid, count,measure,measure_id) {
        for(var i in cart) {
            if (cart[i].nid == nid)
            {
                cart[i].count = parseFloat(count);
                cart[i].measure = measure;
                cart[i].measure_id = measure_id;

                console.log("установили " + nid + " = " + count);
                saveCart();
                break;
            }
            //else console.log("ищем " + nid + " != " + cart[i].nid);
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(nid) {
        for(var item in cart) {
            if(cart[item].nid == nid) {

                cart[item].count --;
                if(cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(nid) {
        for(var item in cart) {
            if(cart[item].nid == nid) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    // Count cart
    obj.totalCount = function() {
        var totalCount = 0;
        for(var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Count cart
    obj.goodsCount = function() {
        var goodsCount = 0;
        for(var item in cart) {
            if (cart[item].nid && cart[item].count > 0) goodsCount++;
        }
        return goodsCount;
    }

    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for(var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for(i in cart) {
            item = cart[i];
            itemCopy = {};
            for(p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


window.addEventListener('storage', () => {
    // When local storage changes, dump the list to
    // the console.
    if (event.storageArea != window.localStorage) return;
    if (event.key === 'shoppingCart') {
        // Do something with event.newValue
        console.log(event);
        window.localStorage.setItem('shoppingCart', event.newValue);
        cart = JSON.parse(window.localStorage.getItem('shoppingCart'));

        var c = document.querySelector('#cart-count');
        if (c) {
            var goodsCount = shoppingCart.goodsCount();
            c.innerHTML = goodsCount;
            show(c);
        }

        var el = document.getElementById('cart-checkout');
        if (el) displayCart();
    }
});


function showLertter(letter) {
        var els = document.querySelectorAll("#list_collects .interriors li");
        if (els) {
            for (const el of els) {
                var cur_letter = el.getAttribute("data-letter");
                if (cur_letter == letter || letter == 'ВСЕ') el.style.display = 'inline-block';
                else el.style.display = 'none';
            }
        }
    }

function unwrap(wrapper) {
    // place childNodes in document fragment
    var docFrag = document.createDocumentFragment();
    while (wrapper.firstChild) {
        var child = wrapper.removeChild(wrapper.firstChild);
        docFrag.appendChild(child);
    }

    // replace wrapper with document fragment
    wrapper.parentNode.replaceChild(docFrag, wrapper);
}

function setPersistentCookie(name, value, expires) {
  var cookie = name + "=" + value + "; path=/; domain=." + location.hostname.replace(/^www\./i, "");
  if (typeof expires !== "undefined") {
  var now = new Date();
  now.setTime(now.getTime() + expires * 24 * 60 * 60 * 1000);
  cookie += "; expires=" + now.toUTCString();
  }

  document.cookie = cookie;
}

function setSessionCookie(name, value) {
  var cookie = name + "=" + value + "; path=/; domain=." + location.hostname.replace(/^www\./i, "");

  document.cookie = cookie;
}


// Initiate JQUERY
// Initiate cookie.js : https://github.com/js-cookie/js-cookie
// Parse the URL
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}




function getrandom(min_random, max_random) {
    var range = max_random - min_random + 1;
    return Math.floor(Math.random()*range) + min_random;
}

function setCookie (name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}


function substr_count( haystack, needle, offset, length ) {	// Count the number of substring occurrences
    //
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

    var pos = 0, cnt = 0;

    if(isNaN(offset)) offset = 0;
    if(isNaN(length)) length = 0;
    offset--;

    while( (offset = haystack.indexOf(needle, offset+1)) != -1 ){
        if(length > 0 && (offset+needle.length) > length){
            return false;
        } else{
            cnt++;
        }
    }

    return cnt;
}



function sortObject(o) {
    var sorted = {},
        key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}


let tab = function () {
    let tabNav = document.querySelectorAll('.tabs_btns a'),
        tabContent = document.querySelectorAll('.tab-one'),
        tabName;

    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
        tabName = this.getAttribute('id');
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('active') : item.classList.remove('active');
        })
    }

};


/**
 * Функция склонения числительных в русском языке
 *
 * @param int    $number Число которое нужно просклонять
 * @param array  $titles Массив слов для склонения
 * @return string
 **/
function declOfNum(number, titles)
{
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}



// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

function delsov()
{
    $('body').children( "div" ).each(function(  ) {
        var getid = $(this).attr('id');
        var getclass = $(this).attr('class');

        var hasbutton = $(this).find('button').length;

        if (getid == getclass && hasbutton > 0)   { $(this).remove(); $('html').css('margin-top','0px'); }
    });
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}



function getRealDisplay(elem) {
    if (elem.currentStyle) {
        return elem.currentStyle.display
    } else if (window.getComputedStyle) {
        var computedStyle = window.getComputedStyle(elem, null )

        return computedStyle.getPropertyValue('display')
    }
}

function hide(el) {
  if (el) {
      if (!el.getAttribute('displayOld')) {
          el.setAttribute("displayOld", el.style.display)
      }

      el.style.display = "none"
  }
}

displayCache = {}

function isHidden(el) {
    if (el) {
        var width = el.offsetWidth, height = el.offsetHeight,
            tr = el.nodeName.toLowerCase() === "tr"

        return width === 0 && height === 0 && !tr ?
            true : width > 0 && height > 0 && !tr ? false : getRealDisplay(el)
    }
}

function toggle(el) {
    if (el)
    { isHidden(el) ? show(el) : hide(el) }
}


function show(el) {
 if (el) {
     if (getRealDisplay(el) != 'none') return

     var old = el.getAttribute("displayOld");
     el.style.display = old || "";

     if (getRealDisplay(el) === "none") {
         var nodeName = el.nodeName, body = document.body, display

         if (displayCache[nodeName]) {
             display = displayCache[nodeName]
         } else {
             var testElem = document.createElement(nodeName)
             body.appendChild(testElem)
             display = getRealDisplay(testElem)

             if (display === "none") {
                 display = "block"
             }

             body.removeChild(testElem)
             displayCache[nodeName] = display
         }

         el.setAttribute('displayOld', display)
         el.style.display = display
     }
 }
}



function serialize(form) {
    let requestArray = [];
    form.querySelectorAll('[name]').forEach((elem) => {
        requestArray.push(elem.name + '=' + elem.value);
    });
    if(requestArray.length > 0)
        return requestArray.join('&');
    else
        return false;
}


function declOfNum(number, words) {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

function serializeForm(form_data) {

    let requestArray = [];
    for(var pair of form_data.entries()) {
        //console.log(pair[0]+ ', '+ pair[1]);
        requestArray.push(pair[0] + '=' + pair[1]);
    }

    if(requestArray.length > 0)
        return requestArray.join('&');
    else
        return false;
}

function closest (el, predicate) {
    do if (predicate(el)) return el;
    while (el = el && el.parentNode);
}


function ajax(option) { // $.ajax(...) without jquery.
    if (typeof(option.url) == "undefined") {
        try {
            option.url = location.href;
        } catch(e) {
            var ajaxLocation;
            ajaxLocation = document.createElement("a");
            ajaxLocation.href = "";
            option.url = ajaxLocation.href;
        }
    }
    if (typeof(option.type) == "undefined") {
        option.type = "GET";
    }
    if (typeof(option.data) == "undefined") {
        option.data = null;
    } else {

        var data = "";
        for (var x in option.data) {
            if (data != "") {
                data += "&";
            }
            data += encodeURIComponent(x)+"="+encodeURIComponent(option.data[x]);
        };


        option.data = data;
    }

    if (option.datajson)
    {
        option.data = option.datajson;
    }


    if (typeof(option.statusCode) == "undefined") { // 4
        option.statusCode = {};
    }
    if (typeof(option.beforeSend) == "undefined") { // 1
        option.beforeSend = function () {};
    }
    if (typeof(option.success) == "undefined") { // 4 et sans erreur
        option.success = function () {};
    }
    if (typeof(option.error) == "undefined") { // 4 et avec erreur
        option.error = function () {};
    }
    if (typeof(option.complete) == "undefined") { // 4
        option.complete = function () {};
    }
    typeof(option.statusCode["404"]);

    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) { try { xhr = new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) { xhr = new ActiveXObject("Microsoft.XMLHTTP"); } }
        else { xhr = new XMLHttpRequest(); }
    } else { alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest..."); return null; }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 1) {
            option.beforeSend();
        }
        if (xhr.readyState == 4) {
            option.complete(xhr, xhr.status);
            if (xhr.status == 200 || xhr.status == 0) {
                option.success(xhr.responseText);
            } else {
                option.error(xhr.status);
                if (typeof(option.statusCode[xhr.status]) != "undefined") {
                    option.statusCode[xhr.status]();
                }
            }
        }
    };

    if (option.type == "POST") {
        xhr.open(option.type, option.url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(option.data);
    } else {
        xhr.open(option.type, option.url+option.data, true);
        xhr.send(null);
    }

}





/*
function getGoodCountPodbor()
{
    var form_data = $('#filter_podbor').serialize();

    $.ajax({
        type: "POST",
        url: "/sites/all/scripts/ajax_podbor.php",
        dataType: 'json',
        data: form_data,
        beforeSend: function(){
            $('#button_send').val("Идет поиск...");
        },
        error: function(){
            $('#button_send').val("Показать");
        },
        success: function(data){
            var col = data.col;

            if (col >= 0) str = "Показать " + col + declOfNum(col, [' товар', ' товара', ' товаров']);

            $('#button_send').val(str);
        }
    });
}
*/


function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

function getTextWords (text = '')
{
    let wordArr = text.trim().split(/\s+/g)
    if (!wordArr[0].length) return 0;
    return wordArr;
}



function mkBtn (el = "article", num = 10)
{
    let text = document.getElementsByTagName(el)
    let wordArr = [[]];
    let btn;
    let temp = [[]]



    if (num < 1)
        num = 1;
    for (i = 0; i < text.length; i++)
    {

        wordArr[0][i] = getTextWords(text[i].innerText)
        if (num > wordArr[0][i].length)
            temp[0][i] = wordArr[0][i].length - 1;
        else temp[0][i] = num;
        text[i].innerText = wordArr[0][i].slice(0, temp[0][i]).join(" ") + "...";
        btn = document.createElement('button')
        btn.setAttribute('name', i);
        btn.innerText = 'Читать полностью';
        text[i].appendChild(btn);
    }

    let btns = document.getElementsByTagName("main")
    btns[0].onclick = function (e)
    {

        if(e.target.tagName !== "BUTTON") return;

        let attr = e.target.getAttribute('name')

        if (e.target.innerText === 'Сократить')
        {
            if(temp[0][attr] > wordArr[0][attr].length)
                text[attr].innerText = wordArr[0][attr].slice(0, wordArr[0][attr].length-1).join(" ") + "...";

            else text[attr].innerText = wordArr[0][attr].slice(0, temp[0][attr]).join(" ") + "...";
            text[attr].appendChild(e.target)
            e.target.innerText = 'Читать полностью';
        } else
        {
            text[attr].removeChild(e.target)
            text[attr].innerText = wordArr[0][attr].join(" ");
            text[attr].appendChild(e.target)
            e.target.innerText = 'Сократить';
        }
    }
}


function mkBtn (el = "article", num = 10)
{
    let text = document.getElementsByClassName(el)
    let wordArr = [[]];
    let btn;
    let temp = [[]]



    if (num < 1)
        num = 1;
    for (i = 0; i < text.length; i++)
    {

        wordArr[0][i] = getTextWords(text[i].innerText)
        if (num > wordArr[0][i].length)
            temp[0][i] = wordArr[0][i].length - 1;
        else temp[0][i] = num;
        text[i].innerText = wordArr[0][i].slice(0, temp[0][i]).join(" ") + "...";
        btn = document.createElement('button')
        btn.setAttribute('name', i);
        btn.innerText = 'Читать полностью';
        text[i].appendChild(btn);
    }

    let btns = document.getElementsByTagName("main")
    btns[0].onclick = function (e)
    {

        if(e.target.tagName !== "BUTTON") return;

        let attr = e.target.getAttribute('name')

        if (e.target.innerText === 'Сократить')
        {
            if(temp[0][attr] > wordArr[0][attr].length)
                text[attr].innerText = wordArr[0][attr].slice(0, wordArr[0][attr].length-1).join(" ") + "...";

            else text[attr].innerText = wordArr[0][attr].slice(0, temp[0][attr]).join(" ") + "...";
            text[attr].appendChild(e.target)
            e.target.innerText = 'Читать полностью';
        } else
        {
            text[attr].removeChild(e.target)
            text[attr].innerText = wordArr[0][attr].join(" ");
            text[attr].appendChild(e.target)
            e.target.innerText = 'Сократить';
        }
    }
}




// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : 'undefined';
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}


function new_lead(lead_name = '', client_phone = '', client_name = '', lead_val = '', uiscom = '')
{
    var utm_source = getCookie('utm_source');       if (utm_source === undefined) utm_source = '';
    var utm_campaign = getCookie('utm_campaign');   if (utm_campaign === undefined) utm_campaign = '';
    var utm_content = getCookie('utm_content');     if (utm_content === undefined) utm_content = '';
    var utm_term = getCookie('utm_term');           if (utm_term === undefined) utm_term = '';
    var ym_clientid = getCookie('_ym_uid');         if (ym_clientid === undefined) ym_clientid = '';
    var google_clientid = getCookie('_gid');        if (google_clientid === undefined) google_clientid = '';
    
    if (Comagic) var comagic_visitor_id = Comagic.getVisitorId();
    else var comagic_visitor_id = '';
    
    if (Comagic) var comagic_session_id = Comagic.getSessionId();
    else var comagic_session_id = '';
    
    
    ajax({
            type: "POST",
            data: { lead_name: lead_name, lead_val: lead_val, uiscom:uiscom, client_phone:client_phone,  client_name:client_name, utm_source:utm_source, utm_campaign:utm_campaign, utm_content:utm_content, utm_term:utm_term, ym_clientid:ym_clientid, google_clientid:google_clientid,  comagic_visitor_id:comagic_visitor_id, comagic_session_id:comagic_session_id},
            url: "/sites/all/scripts/new_lead.php",
            success: function(data){
               console.log('Лид записан ' + lead_name);
            },
            error: function(data) {
               console.log('Ошибка записи лида ' + lead_name);
            
            }
        });
}


function verbox_click(channel = '')
{
    new_lead('verbox_'+channel);
    
}