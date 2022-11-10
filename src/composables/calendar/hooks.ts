import { onMounted, ref, watch, type Ref } from 'vue';
import { getInitialCalendar, getYear, getYearFromId } from './helpers';

export const useYearView = () => {
  const id = ref('');
  const yearView = ref(false);
  const toggleView = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    id.value = target.id;
    yearView.value = !yearView.value;
  };

  watch(id, (currentId) => {
    if (currentId) {
      let target;

      if (currentId.startsWith('goto')) {
        const yearId = `year-${getYearFromId(currentId)}`;

        target = document.getElementById(yearId);
      } else {
        target = document.getElementById(currentId);
      }

      if (target) {
        target.scrollIntoView();
      }
    }
  });

  return { yearView, yearId: id, toggleView };
};

export const useCalendar = () => {
  const { yearView, yearId, toggleView } = useYearView();
  const scrollId = ref('');
  const yearRef = ref(null);
  const calendar = getInitialCalendar();
  const currentYear = getYear();
  const callback = (entries: Array<any>) => {
    const { isIntersecting, target } = entries[0];

    if (isIntersecting) {
      const id = getYearFromId(target.id);

      scrollId.value = `${id}`;
    }
  };

  watch(yearId, (currentYearId) => {
    if (currentYearId) {
      const newId = getYearFromId(currentYearId);

      // Update scrollId
      scrollId.value = `${newId}`;
    }
  });

  watch([yearRef, yearView], (_value, _oldValue, onInvalidate) => {
    if (!yearView || !yearRef.value) {
      return;
    }

    const yearElement = yearRef.value as HTMLDivElement;
    const yearChildren = yearElement.children;

    if (!yearView && yearChildren.length) {
      const observer = new IntersectionObserver(callback, {
        root: yearElement,
        threshold: 0.2
      });

      Array.from(yearChildren).forEach((child) => {
        observer.observe(child.firstChild as Element);
      });

      onInvalidate(() => {
        if (observer) {
          observer.disconnect();
        }
      });
    }
  });

  onMounted(() => {
    if (!scrollId.value) {
      // Set current year
      scrollId.value = `${currentYear}`;
    }
  });

  return {
    calendar,
    yearRef,
    scrollId,
    yearView,
    toggleView
  };
};

export const useGoToToday = (yearView: Ref<boolean>) => {
  const monthRef = ref<Element | null>(null);
  const yearRef = ref<Element | null>(null);
  const options: ScrollIntoViewOptions = {
    behavior: 'smooth'
  };

  const scrollToToday = (event: Event) => {
    const target = event.target as HTMLButtonElement;
    const monthElement = monthRef.value;
    const yearElement = yearRef.value;

    if (yearView.value && yearElement) {
      yearElement.scrollIntoView(options);
    } else if (monthElement) {
      window.scrollTo(0, 0);
      monthElement.scrollIntoView(options);
    }

    target.blur();
  };

  onMounted(() => {
    const year = getYear();
    const yearElement = document.getElementById(`year-${year}`);
    const monthElement = document.querySelector('.ui-month--current');

    if (yearElement) {
      yearRef.value = yearElement;
    }

    if (monthElement) {
      monthRef.value = monthElement;

      // Scroll to current month
      monthElement.scrollIntoView();
      window.scrollTo(0, 0);
    }
  });

  return scrollToToday;
};
