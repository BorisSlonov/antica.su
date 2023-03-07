let observer = new IntersectionObserver(function(entries) {
        for (let i in entries){
            let el = entries[i].target;
            if (entries[i].isIntersecting === true){
                if (el.dataset.srcset){
                    el.setAttribute("srcset",el.dataset.srcset);
                    el.removeAttribute("data-srcset");
                } else {
                    el.setAttribute("srcset",el.getAttribute("src"));
                }
                el.classList.remove("le-load");
            }
        } 
    }, { threshold: [0] });

var addRule = (function (style) {
    var sheet = document.head.appendChild(style).sheet;
    return function (selector, css) {
        var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
            return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
        }).join(";");
        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
    };
})(document.createElement("style"));



/*после полной прогрузки страницы*/
document.addEventListener("DOMContentLoaded", function(event) {


    var header_width = parseInt($('h1').width());
    if (header_width > 0) {
        header_width = header_width + 20;
        addRule(".page_header:after", { width: header_width + "px"});
        
       
    }

    //Счетчик сессии
    if(!sessionStorage.getItem('time_in_site'))
    {
        sessionStorage.setItem('time_in_site',Math.floor(Date.now()/1000));
    }
    setInterval(() => {
        if(!sessionStorage.getItem('time_in_site_stop'))
        {
            let time_in_site = Math.floor(Date.now()/1000) - sessionStorage.getItem('time_in_site');
            if (time_in_site > 420)
            {
                if (!sessionStorage.getItem('bolee_7_min')) {
                    console.log('7 мин');
                    ym(6320767, 'reachGoal', 'bolee_7_min');
                    sessionStorage.setItem('bolee_7_min', 1);
                }
            }
            else if (time_in_site > 360 && time_in_site < 419)
            {
                if (!sessionStorage.getItem('bolee_6_min')) {
                    console.log('6 мин');
                    ym(6320767, 'reachGoal', 'bolee_6_min');
                    sessionStorage.setItem('bolee_6_min', 1);
                }
            }

        }
    },30000);


     let mas = document.querySelectorAll('.le-load');
        for (let i = 0; i < mas.length; i++) {
            observer.observe(mas[i]);
        }
        
    console.log('Загрузили DOM');
    
    tab();
    //var viewer = new slimLightbox();
    //displayCart
    // ();



    //Фильтр букв
    var f = document.getElementById("myList-nav");
    if (f)
    {
        function showLertter(letter) {
            var els = document.querySelectorAll(".catalog_short__list .collect");
            if (els) {
                for (const el of els) {
                    var cur_letter = el.getAttribute("data-letter");
                    if (cur_letter == letter || letter == 'Все коллекции') el.style.display = 'flex';
                    else el.style.display = 'none';
                }
            }
        }

        var letters = [];
        var count = 0;
        var all_letters = document.querySelectorAll('.list_collect_name');
        all_letters.forEach(function (item) {
            var letter = item.innerHTML;
            if (letter) {
                if (letters.includes(letter) === false) {
                    letters.push(letter);
                    count = count + 1;
                }

            }
        });
        letters.sort();


        if (count > 3)
        {
            var html = '<div class="ln-letters"><span class="active" data-letter="Все коллекции" style="padding: 2px 6px;">Все коллекции</span>';
            letters.forEach(function(letter)
            {
                html = html + '<span class="'+letter+'" data-letter="'+letter+'">'+letter+'</span>';
            });
            html = html + "</div>";
            var el = document.getElementById("myList-nav");
            if (el) el.innerHTML = html;


            var els = document.querySelectorAll(".ln-letters span");
            if (els)
                for (const el of els)
                {
                    el.addEventListener('click', event => {
                        var cur_letter = event.target.innerText;
                        showLertter(cur_letter);

                        var els = document.querySelectorAll(".ln-letters span");
                        for (const el of els)
                        {
                            el.classList.remove('active');
                        }
                        event.target.classList.add('active');


                    }, false);
                }
        }
    }


    /*функция сработает через 0,5 секунд*/

    setTimeout(function() {
        
        //Быстрый фильтр в коллекции
        var f = document.querySelector('.filter-controls');
        if (f && f.textContent.length > 0)
        {
            var script = document.createElement('script');
            script.onload = function () {
    
                var sizes = {};
    
                var li = document.querySelectorAll('.one_item');
                li.forEach(function(item) {
                    var size = item.getAttribute('data-size');
                    if (size)
                    {
                        if (sizes[size] === undefined) sizes[size] = 0;
                        sizes[size] = sizes[size] + 1;
                    }
                });
    
                sortObject(sizes);
    
                count_sizes = Object.keys(sizes).length;
                if (count_sizes > 1) for(one in sizes) {
                    var el = document.getElementById('control-size');
                    if (el) el.innerHTML += '<button class="control" data-toggle="[data-size=\'' + one  + '\']">' + one +' <sup>'+ sizes[one] +'</sup></button>';
                }
                else
                {
                    var el = document.querySelector('.control-size');
                    if (el) hide(el);
                }
    
                var types = {};
                var li = document.querySelectorAll('.one_item');
                li.forEach(function(item) {
                    var type = item.getAttribute('data-type');
                    if (type)
                    {
                        if (types[type] === undefined) types[type] = 0;
                        types[type] = types[type] + 1;
                    }
                });
    
                sortObject(types);
    
                count_types = Object.keys(types).length;
                if (count_types > 1) for(one in types) {
                    var el = document.getElementById('control-type');
                    if (el) el.innerHTML += '<button class="control" data-toggle="[data-type=\'' + one  + '\']">' + one +' <sup>'+types[one]+'</sup></button>';
                }
                else {
                    var el = document.querySelector('.control-type');
                    if (el) hide(el);
                }
    
                if (count_sizes > 1 || count_types > 1) //count_colors > 1 ||
                {
    
    
                    var containerEl2 = document.querySelector('.catalog_short');
                    var mixer2 = mixitup(containerEl2, {
                        multifilter: {
                            enable: true
                        },
                        animation: {
                            effects: 'fade translateZ(-100px)',
    
                        },
                        callbacks: {
                            onMixStart: function(state, futureState) {
                                    var block = document.querySelectorAll('.razdel_block');
                                    block.forEach(function(item) {
                                        show(item);
                                    });
                            },
                            onMixEnd: function(state, futureState) {
    
                                var block = document.querySelectorAll('.razdel_block');
                                block.forEach(function(item) {
    
                                    var li = item.querySelectorAll('.one_item');
    
                                    //convert to an array
                                    var divsArray = [].slice.call(li);
                                    //so now we can use filter
                                    //find all divs with display none
                                    var displayNone = divsArray.filter(function(el) {
                                        return getComputedStyle(el).display === "none"
                                    });
                                    //and all divs that are not display none
                                    var displayShow = divsArray.filter(function(el) {
                                        return getComputedStyle(el).display !== "none"
                                    });
                                    //and use length to count
                                    var numberOfHiddenDivs = displayNone.length;
                                    var numberOfVisibleDivs = displayShow.length;
    
                                    if (numberOfVisibleDivs == 0) hide(item);
                                    else show(item);
                                });

                                /*
                                document.querySelector('.filter-controls').scrollIntoView({
                                     behavior: 'smooth'
                                });
                                */
                            }
                        }
                    });
                }
    
            };
    
            script.src = '/sites/all/scripts/mixitup-3/dist/mix.js';
            document.head.appendChild(script); //or something of the likes
    
    
        }
   
    }, 1500);


    
    setTimeout(function() {
        //ЧАТ
        var chat = document.querySelectorAll('.chat_disabled').length;
        if (chat == 0)
        {
            (function(d, w, m) {
                window.supportAPIMethod = m;
                var s = d.createElement('script');
                s.type ='text/javascript'; s.id = 'supportScript'; s.charset = 'utf-8';
                s.async = true;
                var id = 'b2bfc6579162edae1e2b9ca86e5377e4';
                s.src = 'https://admin.verbox.ru/support/support.js?h='+id;
                var sc = d.getElementsByTagName('script')[0];
                w[m] = w[m] || function() { (w[m].q = w[m].q || []).push(arguments); };
                if (sc) sc.parentNode.insertBefore(s, sc);
                else d.documentElement.firstChild.appendChild(s);
            })(document, window, 'Verbox');
        }   
    }, 2000);
    
    
    /*функция сработает через 5 секунд*/
    setTimeout(function() {
        

        //ВЫНЕС КОД ИЗ GTM так как была ошибка на $
        //console.log("Код: " + $('#codeuser').html());
        if (document.querySelector('#codeuser')) var code = document.querySelector('#codeuser').textContent;
        if (document.querySelector('.link-mail a')) var emailAddress = document.querySelector('.link-mail a').textContent;
        if (code && emailAddress)
        {
            emailAddress = emailAddress.replace('@', '+' + code + '@');
            console.log("Email: " + emailAddress);
            if (document.querySelector('.link-mail a')) document.querySelector('.link-mail a').href = "mailto:" + emailAddress;
            if (document.querySelector('.contact-email a')) document.querySelector('.contact-email a').href = "mailto:" + emailAddress;
            if (document.querySelector('.mobemail a')) document.querySelector('.mobemail a').href = "mailto:" + emailAddress;
        }

        if (code && Verbox)
        {
            
            Verbox("setClientInfo", {
              custom: {
                uiscom: code
              }
            });
            
            //console.log("Код2: " + code);
            setPersistentCookie("uiscom", code, 90);
        }
        
        if (ga && ga.getAll())
        {
            var tracker = ga.getAll()[0];
            var cid = tracker.get('clientId');

            Verbox("setClientInfo", {
                "custom": {
                    "cid": cid,
                }
            });
        }  
        
        
        var selectElement = document.querySelectorAll('.email_link');
        if (selectElement) for (let i = 0; i < selectElement.length; i++)
        {
            selectElement[i].addEventListener('copy', (event) => {
                   var selection = document.getSelection().toString();
                   var href = event.target.getAttribute('href');
                   if (href) href = href.replace('mailto:','');

                   if (selection == '' || selection === undefined || selection === null) selection = '';
                   if (href && href != '' && href !== null) selection = href;

                   new_lead('copy_email','','',selection);
            });
        }

          
    }, 8000);

    /*функция сработает через 2.5 секунд*/
    setTimeout(function()
    {
        // ЗАГРУЗКА МЕНЮ
        var ajax_menu = document.querySelector('.ajax');
        if (ajax_menu) if (ajax_menu.innerHTML.length > 0) ajax({
            type: "POST",
            url: "/sites/all/scripts/topmenu.php",
            success: function(data){
               if (data) document.querySelector('.vendor-menu').innerHTML = data;

                $('.factory_nav__alfabet>li>a').on('mouseenter', function(event) {
                    event.preventDefault();
                    if ($(window).innerWidth()>=768) {
                        let tab = $(this).data('tab');
                        $('.factory_nav__content [data-tab]').hide();
                        $('.factory_nav__content [data-tab="'+tab+'"]').fadeIn();
                    }
                }).on('mouseleave', function(event) {
                    // event.preventDefault();
                    // $('.factory_nav__content [data-tab]').hide();
                }).on('click', function(event) {
                    event.preventDefault();
                    let tab = $(this).data('tab');
                    $('.factory_nav__content [data-tab]').hide();
                    $('.factory_nav__content [data-tab="'+tab+'"]').fadeIn();
                });
               
               
               // МЕНЮ ФАБРИК
                var cat = document.querySelectorAll(".l-vendor-menu .top-vendors ul li");
            	var target = document.querySelector(".factories ul");
                var fact = '';
                var ul = '';
                var letter = '';
                    
                if (cat && target) cat.forEach(function(item) 
                {
                    var cur = item.querySelector('.letter');
                    if (cur) letter = cur.textContent;  
                    if (letter)
                    { 
                	    var ul = '';
                        var cur_ul = item.querySelector('ul');
                        if (cur_ul) ul = cur_ul.innerHTML;
                        
                        if (letter != '' && ul != '') fact += "<li><span>"+letter+"</span><ul>"+ul+"</ul></li>";
                    }      
                });
                if (fact) target.innerHTML = fact;
                

            },
            error: function(data) {

            }
        });

        
         tab();

    }, 2500);



    var filter = document.querySelector('#filter');
    var c = document.querySelector("#filter_param");

    if (c) {
        var arg = c.getAttribute('data-arg');
        var termid = c.getAttribute('data-termid');
        var curtype = c.getAttribute('data-curtype');
        var curhars = c.getAttribute('data-curhars');
    }

    if (filter) if(filter.textContent.length > 0)
    {
        ajax({
            type: "POST",
            dataJson: {arg:arg, termid:termid, curtype:curtype, curhars:curhars },
            url: "/sites/all/scripts/ajax_filter_new.php",
            success: function(data){

                var jsonData = JSON.parse(data);
                for (const [key, value] of Object.entries(jsonData.filters)) {
                  var el = document.getElementById(key);
                    if (el) 
                    {
                        el.innerHTML = value;
                        $('#block_' + key).mCustomScrollbar("scrollTo",$("input[name="+key+"]:checked"));
                    }                  
                }

                //var c = document.querySelector('#filter_right');
                //if (c) c.innerHTML = data;


                var selectElement = document.querySelectorAll('#filter select, #filter input');
                if (selectElement) for (let i = 0; i < selectElement.length; i++)
                {
                    selectElement[i].addEventListener('change', (event) => {
                        getGoodCount('select');
                    });
                }

                var selectElement = document.querySelectorAll('#filter-sort input[type="radio"]');
                if (selectElement) for (let i = 0; i < selectElement.length; i++)
                {
                    selectElement[i].addEventListener('change', (event) => {
                        getGoodCount('select');
                    });
                }

                var selectElement = document.querySelectorAll('#filter_right input[type="radio"]');
                if (selectElement) for (let i = 0; i < selectElement.length; i++)
                {
                    selectElement[i].addEventListener('click', allowUncheck);
                    selectElement[i].previous = selectElement[i].checked;

                }

                function allowUncheck(e) {
                    if (this.previous) {
                        this.checked = false;
                    }
                    // need to update previous on all elements of this group
                    // (either that or store the id of the checked element)
                    document.querySelectorAll(
                        'input[type=radio][name='+e.currentTarget.name+']').forEach((elem) => {
                        elem.previous = elem.checked;
                    });
                    getGoodCount('select'); 
                }


                var selectElement = document.querySelectorAll('#filter input[type="text"]');
                if (selectElement) for (let i = 0; i < selectElement.length; i++)
                {
                    //console.log("Изменение");
                    
                    selectElement[i].addEventListener('change', (event) => {
                        getGoodCount('input');
                    });
                }

                //$("#filter_podbor select, input[name='sorting']").bind("change", function() {
                //    getGoodCountPodbor();
                //});
            },
            error: function(data) {

            }
        });
    }

    /*
    var scene = $('.tour_block').attr("id");
    if (scene === undefined || scene == '') var scene = 0;
    $('.tour_block').html('<iframe id="tour" src="/3dtour/index.html?startscene='+scene+'" loading="lazy" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" frameborder="no" width="100%" height="80vh"></iframe>');
     */

    //if ($("#barcode_input").length > 0)  $("#barcode_input").focus();

    
    
    /* 3D раскладка */
    winWidth = window.innerWidth;

    if (email) {

        var el = document.querySelector('.contact-email a');
        if (el && el.innerHTML) el.innerHTML = el.innerHTML.replace(/info@antica.su/ig, email);

        var el = document.querySelector('.link-mail a');
        if (el && el.innerHTML) el.innerHTML = el.innerHTML.replace(/info@antica.su/ig, email);

        var el = document.querySelector('.address');
        if (el && el.innerHTML) el.innerHTML = el.innerHTML.replace(/info@antica.su/ig, email);

    }


    //$('.li_show_more').click(function () {
    //    $(this).parent().parent().remove();
    //    $('.li_hide').show();
    //});

    var el = document.querySelector(".phone");
    if (el) show(el);


    var el = document.querySelector("li.pager-next a");
    if (el && el.textContent.length)
    {
        /*
        var button = document.querySelector('.link_more');
        button.addEventListener('click', event => {
            $.autopager('load');
        });

        $.autopager({
            link: 'li.pager-next a',
            autoLoad: true,
            content: '.list_elements ul li.li-plitka, .list_elements ul li.one_element',

            page: 0,
            start: function () {
                var el = document.querySelector('.list_elements');
                if (el) el.after('<div id="views_infinite_scroll-ajax-loader"  class="center" alt="Загружаем товары..."><img alt="loading..." src="https://www.antica.su/sites/default/files/ajax-loader.gif"></div>');
            },
            load: function () {

                var url = window.location.href;
                var name_click = '';
                var price_click = '';

                viewer.refresh();

                var el = document.querySelector('div#views_infinite_scroll-ajax-loader');
                if (el) el.remove();
                //Drupal.attachBehaviors(this);
            }
        });
        */

    }


    //if ($("#descr_term .gallery").length) TipInit($("#descr_term .gallery .thumbs").find("a:first"));//ПОДСКАЗКИ

    /*
    // ИЗМЕНЕНИЯ В ФОРМЕ
    $("#filter select, input[name='sorting']").bind("change", function() {
        getGoodCount();
    });

    $("#filter_podbor input, #filter input").bind("keyup", function() {
        getGoodCount();
    });

    $("#filter_podbor select, input[name='sorting']").bind("change", function() {
        getGoodCountPodbor();
    });
    */

    
    
    
    var el = document.querySelector('#ninja-slider');
    if (el) show(el);

    var el = document.querySelector('.img-lazy');
    if (el) el.remove();
    var el = document.querySelector('.img-lazy-collect');
    if (el) el.remove();


},{passive: true});


 



function getGoodCount(selector='')
{
    var form_el = document.querySelector('#filter');
    var sorting = document.querySelector('input[name=sorting]:checked');
    if (form_el)
    {
        var form = new FormData(form_el);
        var form_data = serializeForm(form)
        
        if (sorting)
        {
            var sorting_val = document.querySelector('input[name=sorting]:checked').value;
            form_data = form_data + "&sorting=" + sorting_val;
        } 
    }
    

    //ym(6320767,'reachGoal','catalog_filter');

    ajax({
        type: "POST",
        url: "/sites/all/scripts/ajax_count.php",
        datajson: form_data,
        beforeSend: function(){
            //$('#button_send').val("Идет поиск...");
        },
        error: function(){
            //$('#button_send').val("Показать");
        },
        success: function(data){
            if (data)
            {
                data = JSON.parse(data);

                var count_tovar = parseInt(data.count_tovar);
                var count_col = parseInt(data.count_col);

                var sizes = data.sizes;
                var base_url = data.base_url;
                var url = data.url;
                var mode = data.mode;
                var str;

                var params = data.params;

                var mode_tovar_count = document.querySelector('.mode_tovar_count');
                var mode_collect_count = document.querySelector('.mode_collect_count');
                var mode_souz = document.querySelector('.mode_souz');

                var output = data.output

                var cur_view = document.getElementById("cur_view").value;

                if (count_col > 0 && count_col !== null)
                {
                    str = "Показать " + count_col + declOfNum(count_col, [' кол-цию', ' кол-ции', ' кол-ций']);
                    var view_collect = count_col + declOfNum(count_col, [' коллекция', ' коллекции', ' коллекций']);

                    view_collect = "<a id='collect_button' class='new_toggler__itm' href='/" + base_url + "?" + url + "&view=inter'>Коллекции</a>";

                    if (mode_collect_count) { mode_collect_count.innerHTML = view_collect; show(mode_collect_count); }
                    if (mode_souz) show(mode_souz);
                }
                else { if (mode_collect_count) hide(mode_collect_count); if (mode_souz) hide(mode_souz); }

                if (count_tovar > 0 && count_tovar !== null)
                {
                    str = "Показать " + count_tovar + declOfNum(count_tovar, [' товар', ' товара', ' товаров']);
                    var view_tovar = count_tovar + declOfNum(count_tovar, [' товар', ' товара', ' товаров']);

                    view_tovar = "<a id='good_button'  class='new_toggler__itm'  href='/" + base_url + "?" + url + "&view=prod'>Товары</a>";

                    if (mode_tovar_count) { mode_tovar_count.innerHTML = view_tovar; show(mode_tovar_count); }
                }
                else {
                    if (mode_tovar_count) mode_tovar_count.innerHTML = "Нет подходящих товаров";
                }

                if (mode == 2 && count_col == 0 && count_tovar == 0)
                {
                    mode_tovar_count.classList.add('mode_active');
                }
                else if (mode == 2 && count_tovar > 0)
                {
                    mode_tovar_count.classList.remove('mode_active');
                }

                var b = document.querySelector('#button_send');
                if (b) b.value = str;

                if (selector !== 'slider')
                {
                    if (cur_view && cur_view == 'inter')
                    {
                        var formButton = document.getElementById("collect_button");
                        if (formButton) formButton.click();
                    }
                    if (cur_view && cur_view == 'prod')
                    {
                        var formButton = document.getElementById("good_button");
                        if (formButton) formButton.click();
                    }
                    if (cur_view && cur_view == 'filter')
                    {
                        var formButton = document.getElementById("good_button");
                        if (formButton) formButton.click();
                    }
                }

             }

        }
    });
}


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}