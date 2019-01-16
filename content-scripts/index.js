
class Label {
  constructor(category, labelParentElement, labelParentElementIndex) {
      this.category = category;
      this.labelParentElement = labelParentElement;
      this.labelParentElementIndex = labelParentElementIndex;
  }

  sendToBackground(category, DOMelement) {
    chrome.runtime.sendMessage({
      contentScript: "Label button clicked",
      data: {
        category: category,
        DOMelement: DOMelement
      }
    }, function(response) {
      console.log(`${response.backgroundScript}`);
    });
  }

  createBtn() {
   var btn = document.createElement("button")
   btn.className = "btn"
   btn.id = this.category
   btn.textContent = `${this.category} wage theft`
   var elementToLabel = this.labelParentElement[this.labelParentElementIndex]
   // console.log(elementToLabel)
   elementToLabel.appendChild(btn)

   btn.addEventListener('click', this.sendToBackground.bind(this, this.category, elementToLabel), false)
  
  }
}

const labelParentElements = document.getElementsByClassName('_1poyrkZ7g36PawDueRza-J _11R7M_VOgKO1RJyRSRErT3')

for (var i=0; i < labelParentElements.length; i++) {
  var yes = new Label('yes', labelParentElements, i)
  var maybe = new Label('maybe', labelParentElements, i)
  var no = new Label('no', labelParentElements, i)

  yes.createBtn()
  maybe.createBtn()
  no.createBtn()
}

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
// Select the node that will be observed for mutations
// Options for the observer (which mutations to observe)
// var config = { attributes: true, childList: true, subtree: true };

// // Callback function to execute when mutations are observed
// var callback = function(mutationsList, observer) {
//     for(var mutation of mutationsList) {
//         if (mutation.type == 'childList') {
//             console.log('A child node has been added or removed.');
//         }
//         else if (mutation.type == 'attributes') {
//             console.log('The ' + mutation.attributeName + ' attribute was modified.');
//         }
//     }
// };

// // Create an observer instance linked to the callback function
// var observer = new MutationObserver(callback);

// // Start observing the target node for configured mutations
// observer.observe(labelParentElements, config);

// // Later, you can stop observing
// // observer.disconnect();
// 
    
