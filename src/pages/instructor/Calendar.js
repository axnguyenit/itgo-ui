import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
//
import { useState, useRef, useEffect } from 'react';
// @mui
import { Card, Container, DialogTitle } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { updateEvent, selectRange } from '../../redux/slices/calendar';
// routes
import { PATH_INSTRUCTOR } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import { DialogAnimate } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CalendarForm, CalendarStyle, CalendarToolbar } from '../../sections/instructor/calendar';
// api
import eventApi from '../../api/eventApi';

// ----------------------------------------------------------------------

export default function Calendar() {
	const dispatch = useDispatch();
	const isDesktop = useResponsive('up', 'sm');
	const calendarRef = useRef(null);
	const [date, setDate] = useState(new Date());
	const [view, setView] = useState(isDesktop ? 'dayGridMonth' : 'listWeek');
	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [isOpenModal, setIsOpenModal] = useState(false);

	const { selectedRange } = useSelector((state) => state.calendar);

	const getEvents = async () => {
		try {
			const response = await eventApi.getByInstructor();
			setEvents(response.data.events);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
			calendarApi.changeView(newView);
			setView(newView);
		}
	}, [isDesktop]);

	const handleClickToday = () => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.today();
			setDate(calendarApi.getDate());
		}
	};

	const handleChangeView = (newView) => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.changeView(newView);
			setView(newView);
		}
	};

	const handleClickDatePrev = () => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.prev();
			setDate(calendarApi.getDate());
		}
	};

	const handleClickDateNext = () => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.next();
			setDate(calendarApi.getDate());
		}
	};

	// user not need
	const handleSelectRange = (arg) => {
		const calendarEl = calendarRef.current;
		if (calendarEl) {
			const calendarApi = calendarEl.getApi();
			calendarApi.unselect();
		}
		dispatch(selectRange(arg.start, arg.end));
		setIsOpenModal(true);
	};

	const handleSelectEvent = (arg) => {
		const selectedEvent = events.find((event) => event.id === arg.event.id);
		setSelectedEvent(selectedEvent);
		setIsOpenModal(true);
	};

	const handleResizeEvent = async ({ event }) => {
		try {
			dispatch(
				updateEvent(event.id, {
					allDay: event.allDay,
					start: event.start,
					end: event.end,
				})
			);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDropEvent = async ({ event }) => {
		try {
			dispatch(
				updateEvent(event.id, {
					allDay: event.allDay,
					start: event.start,
					end: event.end,
				})
			);
			setIsOpenModal(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCloseModal = () => {
		setIsOpenModal(false);
		setSelectedEvent(null);
	};

	return (
		<Page title="Calendar">
			<Container maxWidth="xl">
				<HeaderBreadcrumbs
					heading="Calendar"
					links={[{ name: 'Instructor', href: PATH_INSTRUCTOR.root }, { name: 'Calendar' }]}
				/>

				<Card>
					<CalendarStyle>
						<CalendarToolbar
							date={date}
							view={view}
							onNextDate={handleClickDateNext}
							onPrevDate={handleClickDatePrev}
							onToday={handleClickToday}
							onChangeView={handleChangeView}
						/>
						<FullCalendar
							weekends
							droppable
							selectable //user not need
							events={events}
							ref={calendarRef}
							rerenderDelay={10}
							initialDate={date}
							initialView={view}
							dayMaxEventRows={3}
							eventDisplay="block"
							headerToolbar={false}
							allDayMaintainDuration
							eventResizableFromStart
							select={handleSelectRange}
							eventDrop={handleDropEvent}
							eventClick={handleSelectEvent}
							eventResize={handleResizeEvent}
							height={isDesktop ? 720 : 'auto'}
							plugins={[
								listPlugin,
								dayGridPlugin,
								timelinePlugin,
								timeGridPlugin,
								interactionPlugin,
							]}
						/>
					</CalendarStyle>
				</Card>

				<DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
					<DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>

					<CalendarForm
						event={selectedEvent || {}}
						range={selectedRange}
						onCancel={handleCloseModal}
						onGetEvents={getEvents}
					/>
				</DialogAnimate>
			</Container>
		</Page>
	);
}
