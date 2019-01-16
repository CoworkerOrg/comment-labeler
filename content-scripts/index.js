
class Label {
  constructor(category, redditContentType, labelParentElement, labelParentElementIndex) {
      this.category = category;
      this.redditContentType = redditContentType;
      this.labelParentElement = labelParentElement;
      this.labelParentElementIndex = labelParentElementIndex;
  }

  sendToBackground(category, redditContentType) {
    chrome.runtime.sendMessage({
      contentScript: "Label button clicked",
      data: {
        category: category,
        redditContentType: redditContentType
      }
    }, function(response) {
      console.log(`${response.backgroundScript}`);
    });
  }

  createBtn(type) {
   const btn = document.createElement("button")
   btn.className = "btn"
   btn.id = this.category
   btn.textContent = `${this.category} wage theft`
   const elementToLabel = this.labelParentElement[this.labelParentElementIndex]
   elementToLabel.appendChild(btn)
   btn.addEventListener('click', this.sendToBackground.bind(this, this.category, this.redditContentType), false)
  }
}

function appendBtnToClass(className, type) {
  const allElements = document.getElementsByClassName(className)

  for (let i=0; i < allElements.length; i++) {
    const yes = new Label('yes', type, allElements, i)
    const maybe = new Label('maybe', type, allElements, i)
    const no = new Label('no', type, allElements, i)
    yes.createBtn()
    maybe.createBtn()
    no.createBtn()
  }
}

const submissionsClassName = '_1KNG36IrXcP5X-eLQsMjZb'
const commentsClassName = 'Comment'
appendBtnToClass(submissionsClassName, 'submission')
appendBtnToClass(commentsClassName, 'comment')
