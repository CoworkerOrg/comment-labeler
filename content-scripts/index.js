class Label {
  constructor(category, redditContentType, labelParentElement, labelParentElementIndex) {
      this.category = category;
      this.redditContentType = redditContentType;
      this.labelParentElement = labelParentElement;
      this.labelParentElementIndex = labelParentElementIndex;
  }

  createBtn() {
   const btn = document.createElement("button")
   btn.className = "btn"
   btn.id = this.category
   btn.textContent = `${this.category} wage theft`
   const elementToLabel = this.labelParentElement[this.labelParentElementIndex]
   elementToLabel.appendChild(btn)
   btn.addEventListener('click', this.sendToBackground.bind(this, this.category, this.redditContentType, elementToLabel), false)
  }

  sendToBackground(category, redditContentType, parentClassName) {
    chrome.runtime.sendMessage({
      data: {
        category: category,
        redditContentType: redditContentType,
        text: getContent(redditContentType, parentClassName).text,
        user: getContent(redditContentType, parentClassName).user,
      }
    }, function(response) {
      console.log(`response: ${response.backgroundScript}`);
    });
  }
}

function getContent(redditContentType, parentClassName) {
    switch(redditContentType) {
      case('comment'):
        var user = parentClassName.querySelectorAll('.s1461iz-1')[0].textContent
        const commentText = parentClassName.querySelectorAll('.s90z9tc-10')[0].textContent
        return { 
          user: user,
          text: commentText
        }
      case('submission'):
        var user = parentClassName.getElementsByClassName('_2tbHP6ZydRpjI44J3syuqC s1461iz-1')[0].textContent
        const strippedUser = user.replace('u/', '')
        const submissionTitle = parentClassName.getElementsByClassName('_1rcejqgj_laTEewtp2DbWG')[0].textContent
        try {
          var submissionText = parentClassName.getElementsByClassName('s69d4o1-6')[0].textContent
        }
        catch {
          var submissionText = null
        }
        return {
          user: strippedUser,
          text: {
            body: submissionText,
            title: submissionTitle
          }
        }
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
