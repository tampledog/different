
var collectionItems = [
	{	
		preset:'islands#darkOrangeIcon',
		items:[
			{
				coordse:[55.75, 37.50],
				ballonHeader:'Header text1',
				ballonBody:'Body text1'
			},
			{
				coordse:[55.75, 37.71],
				ballonHeader:'Header text2',
				ballonBody:'Body text2',
				ballonFooter:'Footer text2'
			},
			{
				coordse:[55.70, 37.70],
				ballonHeader:'Header text3',
				ballonBody:'Body text3',
				ballonFooter:'Footer text3'
			}
		]
		
	},
	{
		preset:'islands#pinkIcon',
		items:[
			{coordse:[55.76, 37.49]},
			{coordse:[55.76, 37.56]},
			{coordse:[55.76, 37.55]},
			{coordse:[55.73, 37.60]}
        ]
	},
	{
		preset:'islands#greenIcon',
		items:[
			{coordse:[55.70, 37.53]},
			{coordse:[55.70, 37.70]},
			{coordse:[55.75, 37.71]}
        ]
	}
];

function mapInit(data){
	ymaps.ready(init);

	var map, placemark;
	var coordX = 55.75, coordY = 37.50;
	var placemarkArray = [];
	var collection=[];

	function init(){
		map = new ymaps.Map('map1',{  //инициализация карты
			center:[coordX, coordY], //определение центра карты *
			zoom:10, //приближение карты *
			type: 'yandex#satellite' //тип карты (yandex#satellite, yandex#hybrid, yandex#publicMap, yandex#publicMapHybrid)
		},{
			autoFitToViewport: 'always' //резиновая карта
		});

		map.behaviors.disable('scrollZoom'); // Отключени зума при прокрутке колёсика мыши (не нашёл как вирубить непосредственно при инициализации карты)
 
		map.setCenter([55.70, 37.50]); // изменение центра карты

		/* ----------------------------------------------------------------- */

		placemark = new ymaps.Placemark([coordX, coordY],{ /* Placemark вариант GeoObject без возможности использования геометрии */
			/* Свойства */
		},{
			/* Опции */
			preset:'islands#redIcon' // изменения стиля значка из набора встроеных стилей
		});

		map.geoObjects.add(placemark); // Добавление метки на карту

		/* ----------------------------------------------------------------- */

		placemark = new ymaps.Placemark([55.73, 37.55],{

		},{
			iconLayout: 'default#image', // метка с текстом или без (default#image или default#imageWithContent соответвенно)
			iconImageHref: 'images/map_icon.png', // Путь к картинке иконки
			iconImageSize: [40, 30], // ширина и высота иконки
			iconImageOffset: [0, -30] // отступ иконки от заданого центра метки 
		});

		map.geoObjects.add(placemark);

		/* ----------------------------------------------------------------- */

		for(i=0;i<$('.list-item').length;i++){
			coordX=$('.list-item').eq(i).attr('data-coordX');
			coordY=$('.list-item').eq(i).attr('data-coordY');
			placemark = new ymaps.Placemark([coordX, coordY]);
			placemarkArray[i] = placemark; // Сохранение ссылок на метки

			/* При осваивании кода ниже особо обратить внимание на то что запись ссылки метки в масив происходит раньше чем обьявление собитий метки */

			placemark.events.add('mouseenter',function(e){ // Добавляем событые hover метке
	        	var object=e.get('target'); // Определяем обёкт метки
	        	var point;	
	        	point = placemarkArray.indexOf(object); // Производим поиск индекса метки в массиве
	        	if(point!=(-1)){
	        		$('.list-item').eq(point).addClass('hover');
	        	}
	        });
	        placemark.events.add('mouseleave', function(){ // Добавляем событые unhover метке
	        	$('.list-item').removeClass('hover');
	        });

			map.geoObjects.add(placemark);
		}

		/* ----------------------------------------------------------------- */

		var obj;                             // Переменая определяющая откуда беруться параметры для карт
		                                     // (С переменной или JSON файла)
		if(data!=undefined){
			var obj=data.collectionItems;
		}
		else{
			obj=collectionItems;
		}

		for(i=0;i<obj.length;i++){
			collection[i]=new ymaps.GeoObjectCollection({ // Колекция объектов 
				// Без понятия что это ). Скорее всего аналог свойств GeoObject.
			},{
				// Опции
				preset:obj[i].preset // Заданые опции будут применимы ко  всем объектам в колекции
			});

			for(k=0;k<obj[i].items.length;k++){
				var collectionPlacemark=new ymaps.Placemark(obj[i].items[k].coordse);

				if(obj[i].items[k].ballonHeader!=undefined){
					collectionPlacemark.properties.set({balloonContentHeader:'<div class="ballonHeader">'+obj[i].items[k].ballonHeader+'</div>'}); // Добавляем хедер балуна (header)
				}
				if(obj[i].items[k].ballonBody!=undefined){
					collectionPlacemark.properties.set({balloonContentBody:'<div class="ballonBody">'+obj[i].items[k].ballonBody+'</div>'}); // Добавляем тело балуна (body)
				}
				if(obj[i].items[k].ballonFooter!=undefined){
					collectionPlacemark.properties.set({balloonContentFooter:'<div class="ballonFooter">'+obj[i].items[k].ballonFooter+'</div>'}); // Добавляем футер балуна (footer)
				}

				collection[i].add(collectionPlacemark); // Добавление обьектов в колекцию
			}

			$('.checkboxes').append('<label><input type="checkbox" name=name'+i+'> Some checkbox'+i+'</label>'); // Добавляем чекбоксы для отображения колекций
		}

		$('.checkboxes input').change(function(){ // Функция добавления/удаления колекции на карте
			$(this).toggleClass('active');
			var index=$(this).parent().index();
			if($(this).is('.active')){
				map.geoObjects.add(collection[index]); // Добавление колекции на карте 
			}
			else{
				map.geoObjects.remove(collection[index]); // Удаление колекции на карте
			}
		});
		
		function cuclicMap(maps){
			var someIdPoint=0;
			maps.each(function(){ //Цикличное обьявление карт (в GoogleMaps проще)

				var idText="mapes"+someIdPoint; //Задаем значение айдишника карты
				$(this).attr('id', idText); //Присваиваем айдишник блоку с картой
				
				var thoseX=$(this).attr('data-coordX');
				var thoseY=$(this).attr('data-coordY');
				var thosePlacemark;

				var map=new ymaps.Map(idText,{
					center:[thoseX, thoseY],
					zoom:10,
					controls:[] //Карта без елементов управления
				});

					map.controls.add('zoomControl',{ // Добавляем шкалу масштаба к карте
						size: 'large' // Определяем шкалу с ползунком
					});

				thosePlacemark=new ymaps.Placemark([thoseX,thoseY]);
				map.geoObjects.add(thosePlacemark);

				someIdPoint++;
			});
		}

		cuclicMap($('.mapes'));
	};
}

$(document).ready(function(){
	mapInit();
	$.getJSON('js/jsonFile.json',function(data){
		mapInit(data);
		// Загрузка параметров карт с JSON файла 
	    // (при тесте не забыть закоментить (удалить)  
	    // масив обьектов в верху текущего файла и функцию инициализации карт mapInit() что выше)
	});
});

