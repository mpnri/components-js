import { Participant, Track } from 'livekit-client';
import {
  getTrackReferenceSource,
  isTrackReference,
  TrackReferenceWithPlaceholder,
} from '../track-reference';

export function sortParticipantsByAudioLevel(
  a: Pick<Participant, 'audioLevel'>,
  b: Pick<Participant, 'audioLevel'>,
): number {
  return b.audioLevel - a.audioLevel;
}

export function sortParticipantsByIsSpeaking(
  a: Pick<Participant, 'isSpeaking'>,
  b: Pick<Participant, 'isSpeaking'>,
): number {
  if (a.isSpeaking === b.isSpeaking) {
    return 0;
  } else {
    return a.isSpeaking ? -1 : 1;
  }
}

export function sortParticipantsByLastSpokenAT(
  a: Pick<Participant, 'lastSpokeAt'>,
  b: Pick<Participant, 'lastSpokeAt'>,
): number {
  if (a.lastSpokeAt !== undefined || b.lastSpokeAt !== undefined) {
    return (b.lastSpokeAt?.getTime() ?? 0) - (a.lastSpokeAt?.getTime() ?? 0);
  } else {
    return 0;
  }
}

export function sortParticipantsByJoinedAt(
  a: Pick<Participant, 'joinedAt'>,
  b: Pick<Participant, 'joinedAt'>,
) {
  return (a.joinedAt?.getTime() ?? 0) - (b.joinedAt?.getTime() ?? 0);
}

export function sortTrackReferencesByType(
  a: TrackReferenceWithPlaceholder,
  b: TrackReferenceWithPlaceholder,
) {
  if (isTrackReference(a)) {
    if (isTrackReference(b)) {
      return 0;
    } else {
      return -1;
    }
  } else if (isTrackReference(b)) {
    return 1;
  } else {
    return 0;
  }
}

/** TrackReference with screen share source goes first. */
export function sortTrackReferencesByScreenShare(
  a: TrackReferenceWithPlaceholder,
  b: TrackReferenceWithPlaceholder,
): number {
  const sourceA = getTrackReferenceSource(a);
  const sourceB = getTrackReferenceSource(b);

  if (sourceA === sourceB) {
    if (sourceA === Track.Source.ScreenShare) {
      if (a.participant.isLocal === b.participant.isLocal) {
        return 0;
      } else {
        return a.participant.isLocal ? 1 : -1;
      }
    }
    return 0;
  } else if (sourceA === Track.Source.ScreenShare) {
    return -1;
  } else if (sourceB === Track.Source.ScreenShare) {
    return 1;
  } else {
    return 0;
  }
}
