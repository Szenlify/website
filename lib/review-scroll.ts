/** Reset both the document and the nested mobile review scrollers. */
export function resetReviewScroll() {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.querySelectorAll<HTMLElement>(
        "[data-reviews-screen], [data-reviews-page], [data-reviews-screen] .review-flip-face, [data-reviews-screen] .review-edit-form",
    ).forEach((element) => {
        element.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
}
