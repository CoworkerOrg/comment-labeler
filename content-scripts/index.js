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
     btn.id = this.category.replace(/\s+/g, '').toLowerCase()
     // btn.textContent = `${this.category.slice(-1)}`
     const elementToLabel = this.labelParentElement[this.labelParentElementIndex]
     elementToLabel.appendChild(btn)
     btn.addEventListener('mouseover', function(event) {
        elementToLabel.classList.add('label-highlight')
     })
     btn.addEventListener('mouseout', function(event) {
        elementToLabel.classList.remove('label-highlight')
     })
     btn.addEventListener('click', this.sendToBackground.bind(this, this.category.slice(-1), this.redditContentType, elementToLabel), false)
  }

  sendToBackground(category, redditContentType, parentClassName) {
    console.log(category)
    chrome.runtime.sendMessage({
      data: {
        category: category,
        redditContentType: redditContentType,
        text: getContent(redditContentType, parentClassName).text,
        user: getContent(redditContentType, parentClassName).user,
      }
    }, function(response) {
      alert(`${response.backgroundScript}`);
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
    const scaleLow = new Label('Low-1', type, allElements, i)
    const scaleMed = new Label('Med-2', type, allElements, i)
    const scaleHigh = new Label('High-3', type, allElements, i)
    const no = new Label('No-0', type, allElements, i)
    scaleLow.createBtn()
    scaleMed.createBtn()
    scaleHigh.createBtn()
    no.createBtn()
  }
}

const submissionsClassName = '_1KNG36IrXcP5X-eLQsMjZb'
const commentsClassName = 'Comment'
appendBtnToClass(submissionsClassName, 'submission')
appendBtnToClass(commentsClassName, 'comment')
