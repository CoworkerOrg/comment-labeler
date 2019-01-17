
class Label {
  constructor(category, redditContentType, labelParentElement, labelParentElementIndex) {
      this.category = category;
      this.redditContentType = redditContentType;
      this.labelParentElement = labelParentElement;
      this.labelParentElementIndex = labelParentElementIndex;
  }

  createBtn(type) {
   const btn = document.createElement("button")
   btn.className = "btn"
   btn.id = this.category
   btn.textContent = `${this.category} wage theft`
   const elementToLabel = this.labelParentElement[this.labelParentElementIndex]
   elementToLabel.appendChild(btn)qq
   btn.addEventListener('click', this.sendToBackground.bind(this, this.category, this.redditContentType, elementToLabel), false)
  }

  sendToBackground(category, redditContentType, parentClassName) {
    // move through the DOM to get comment or submission text by starting with the parent element to which we appended a button
    const DOMstart = parentClassName.getElementsByClassName('s1ook3io-2')[0]
    chrome.runtime.sendMessage({
      contentScript: "Label button clicked",
      data: {
        category: category,
        redditContentType: redditContentType,
        user: getContent(DOMstart).user,
        text: getContent(DOMstart).text
      }
    }, function(response) {
      console.log(`${response.backgroundScript}`);
    });
  }
}

// TODO: this only works for commenters, not submitters. Need to fix for these cases: submission post (as opposed to comment) and submitter responding in comments
function getContent(DOMnode) {
  const user = DOMnode.querySelectorAll('.s1461iz-1')[0].textContent
  const postText = DOMnode.querySelectorAll('.s90z9tc-10')[0].textContent
  return {user: user, text: postText}
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
