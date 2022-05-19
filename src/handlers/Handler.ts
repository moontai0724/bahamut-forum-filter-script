import Filter from "../filters/Filter";

export default class Handler {
  public constructor(public selector: string, public filters: Filter[]) {}

  public execute(): void {
    console.info(`executing ${this.constructor.name}`);
    const targets = document.querySelectorAll(this.selector);
    targets.forEach(target => {
      this.filters.forEach(filter => {
        if (filter.test(target)) {
          console.info("element is safe", target);
          return;
        }

        console.info("hidding element", parent);
        target.classList.add("hidden-by-filter");
      });
    });
  }
}
