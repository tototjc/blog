import fromMarkdown from 'mdast-util-from-markdown'
import toString from 'mdast-util-to-string'
import readingTime, { type Options as ReadingTimeOptions } from 'reading-time'

export default class MdAdditionalInfo {
  public plainText: string

  constructor(mdText: string) {
    this.plainText = toString(fromMarkdown(mdText))
  }

  public getSummary(sliceLength = 100) {
    return this.plainText.slice(0, sliceLength) + (this.plainText.length > sliceLength ? ' ...' : '')
  }

  public getReadingTime(options?: ReadingTimeOptions) {
    return readingTime(this.plainText, options)
  }
}
