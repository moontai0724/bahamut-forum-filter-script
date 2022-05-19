export default abstract class Filter {
  constructor(public selector: string) {}

  /**
   * Test an element is passed the filter or not.
   *
   * @param element The html element to test.
   * @returns true if the element is safe to display, otherwise false.
   */
  public abstract test(element: Element): boolean;
}
