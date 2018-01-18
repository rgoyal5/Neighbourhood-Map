var map, openInfowindow, linkwiki, placeLikes, placeRating, Wikipedialink, WikiDescription; // global variables that are used are declared
function initMap() { // initializing the basic structure of map
    detailBox = new google.maps.InfoWindow(); // storing information window in detail box
    map = new google.maps.Map(document.getElementById('map'), { // fecthing through id using jquery
        center: { // to set the latitude and longitude of the intial map 
                lat: 30.733315, 
                lng: 76.779418,
            },
        zoom: 10 // how much zoom in map
    });
	openInfowindow = new google.maps.InfoWindow({
        maxWidth: 600, // set the width of info window

    });
	
	//ko.applyBindings(new project());
    
}
function googleMapError() //ERROR HANDLING OF MAP DISPLAY
{
    document.getElementById('create-map').innerHTML = "ERROR IN LOADING A GOOGLE MAP!";
}
var hospitals = [
    {
        title: "Fortis",
        lat: 30.694486,
        lng: 76.730800,
        venueid: "4f9f9366e4b05d0fc0b6a866",
		display_place: true, //boolean display_place used to show or hide a place
        is_select: false // boolean is_select to select or unselect a place
        
    },

    {
        title: "PGI",
        lat: 30.760831,
        lng: 76.775845,
		venueid: "4ec2b2d4f5b91b50a74ab1fa",
        is_select: false,
        display_place: true
        

    },

    {
        title: "Alchemist",
        lat: 30.674593,
        lng: 76.864741,
        venueid: "4f3a490de4b0459ce9f78aee",
		display_place: true,
        is_select: false
        
    },
    {
        title: "General Hospital",
        lat: 30.708916,
        lng: 76.780417,
        venueid: "53634f79498eb3c5a8a6edf7",
		display_place: true,
        is_select: false
        
    },
    {
        title: "Oxford Heart And MultiSpeciality Hospital",
        lat: 30.728484,
        lng: 76.789661,
        venueid: "4c35efa8a0ced13a8a8a1a6e",
		display_place: true,
        is_select: false
        
    },
    
];
var project=function() {
	var hospital_ptr=this;
	hospital_ptr.search=ko.observable('');
	hospital_ptr.Error=ko.observable('');
	
	hospital_ptr.locationList=[];
	for(var i=0;i<hospitals.length;i++) {
		var marker=new google.maps.Marker({
			title:hospitals[i].title,
			display_place:ko.observable(hospitals[i].display_place),
			map:map,
			lat:hospitals[i].lat,
			lng:hospitals[i].lng,
			select:ko.observable(hospitals[i].is_select),
			animation:google.maps.Animation.BOUNCE,
			position:new google.maps.LatLng(hospitals[i].lat,hospitals[i].lng),
			venue:hospitals[i].venueid,
		});
		hospital_ptr.locationList.push(marker);
		hospital_ptr.locationListLength=hospital_ptr.locationList.length;
		hospital_ptr.locationListElememt=hospital_ptr.locationList[0];
		
		hospital_ptr.animate=function(marker) {
			marker.setAnimatio(google.maps.Animation.BOUNCE);
		};
	}
	
	hospital_ptr.api=function(marker1) {
		console.log(marker1.title);
		$.ajax(
			{
		url: 'https://api.foursquare.com/v2/venues/search',
        dataType: 'json',
        data: 'client_id=HC5OMTMT0H1EJMO02242A2HWBUU5FLUO4QIKQOMC23M5IFGQ&client_secret=EV2PKPWAJ1C1KQ3RKU22LHSZMGBCEBUGXEE54Z5KF4KIUCP2&v=20130815%20&query=' + marker1.title + '&ll=30.733315,76.730800&radius=12500&limit=1',
        //async: true

}

		
		)
			.done(function(data) {
				console.log(data.response.venues[0]);
				var dest=data.response.venue;
				//console.log('Data from foursquare',data);
				// if (dest.hasOwnProperty('likes')) {
                  //  markerArug.likes = dest.likes.summary;
               // }
                //if (dest.hasOwnProperty('rating')) {
                  //  markerArug.rating = dest.rating;
               // }
				/*if(dest.hasOwnProperty('contact')) {
					marker1.phone=dest.contact.phone;
				}
				if(dest.hasOwnProperty('location')) {
					marker1.address=dest.location.formattedAddress;
				}*/
			});
			//error:function(error) {
				//hospital_ptr.Error("Not Working API" + error);
			//}
	
	};
	//hospital_ptr.timeout=setTimeout(function() {
		//alert('ERROR: Failed to connect');
	//},5000);
	hospital_ptr.filter=function() {
		var curr=hospital_ptr.search().toLowerCase();
		openInfowindow.close();
		if(curr.length==0) {
			hospital_ptr.setShow(true);
		}else {
			for(var t=0;t<hospital_ptr.locationListLength;t++)
			{
				if(hospital_ptr.locationList[t].title.toLowerCase().indexOf(curr)==-1) {
					hospital_ptr.locationList[t].display_place(false);
					hospital_ptr.locationList[t].setVisible(false);
				} else {
					hospital_ptr.locationList[t].display_place(true);
					hospital_ptr.locationList[t].setVisible(true);
				}
			}
		}
		openInfowindow.close();
	};
	hospital_ptr.hide=function() {
		for(var h=0;h<hospital_ptr.locationListLength;i++) {
			hospital_ptr.locationList[h].select(false);
		}
	};
	
	hospital_ptr.setShow=function(visibleV) {
		for(var i=0;i<hospital_ptr.locationListLength;i++) {
			hospitalptr.locationList[i].display_place(visibleV);
			hospital_ptr.locationList[i].setVisible(visibleV);
		}
	};
	
	hospital_ptr.info=function(marker1) {
		hospital_ptr.hide();
		marker1.select(true);
		hospital_ptr.current=marker1;
		//it displays the likes of the selected place
        placeLikes = function() {
            if (curr_ptr.currentLocation.likes === "" || curr_ptr.currentLocation.likes === undefined) {
                return "NOT LIKED YET";
            } else {
                return "LOCATION LIKINGS:" + curr_ptr.currentLocation.likes;
            }
        };
        //it displays the ratings of the selected place
        placeRating = function() {
            if (curr_ptr.currentLocation.rating === "" || curr_ptr.currentLocation.rating === undefined) {
                return "NOT RATED YET";
            } else {
                return "LOCATION RATINGS:" + curr_ptr.currentLocation.rating;
            }
        };

/*		contact=function() {
			if(hospital_ptr.current.phone===" " ||hospital_ptr.current.phone===undefined) {
				return " No phone available";
			} else {
				return "Phone no:"+ hospital_ptr.current.phone;
			}
		};
		address=function() {
			if(hospital_ptr.current.address===" " ||hospital_ptr.current.address===undefined) {
				return " No phone available";
			} else {
				return "Phone no:"+ hospital_ptr.current.address;
			}
		};
		
	*/	openInfowindow.setContent(
            "<h5>" + hospital_ptr.current.title + "</h5>" +
            "<b>" + "Latitude:" + "</b>" + "<div>" + hospital_ptr.current.lat + "</div>" +
            "<b>" + "Longitude:" + "</b>" + "<div>" + hospital_ptr.current.lng + "</div>" +
            "<b>" + "Foursqaure Information:" + "</b>" + "<div>" + placeLikes() + "</div>" +
            "<div>" + placeRating() + "</div>");
			
			openInfowindow.open(map,marker1);
			hospital_ptr.animate(marker1);
	};
	
	for(var i=0;i<hospital_ptr.locationListLength;i++)
	{
		(function(marker) {
			hospital_ptr.api(marker);//foursquare
			
			marker.addListener('click',function() {
				hospital_ptr.info(marker);
			});
		})(hospital_ptr.locationList[i]);
	}
};

	var ViewModel = {
    search: ko.observable(''),
    locationList: ko.observableArray(),
    Error: ko.observable(''),

    //this function updates the displayed list as per marker's list
    refreshDisplayList: function() {
        ViewModel.locationList.removeAll();
        for (var i = 0; i < hospitals.length; i++) {
            ViewModel.locationList.push(hospitals[i].title);
        }
    },

    //this function updates the marker and the text list as per keyword given by user
    updateSearchList: function(searchWord) {
        ViewModel.locationList.removeAll();
        for (var num = 0; num < hospitals.length; num++) {
            if (hospitals[num].title.toLowerCase().indexOf(searchWord.toLowerCase()) > -1) {
                hospitals[num].setVisible(true);
                ViewModel.locationList.push(hospitals[num].title);
            } else {
                hospitals[num].setVisible(false);
            }
        }
    },

    apiError: function() {
        var reply = confirm(ViewModel.error() + "\nPlease reload the webpage");
        if (reply) {
            window.location.reload();
        }
    }

};
ko.applyBindings(ViewModel);
ViewModel.search.subscribe(ViewModel.updateSearchList);
